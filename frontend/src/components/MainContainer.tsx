import React, { useState, useEffect } from "react";
import { SortType, Comment, User, CommentThread } from "../constants/types";
import { CommentInput } from "./CommentInput";
import { SortBar } from "./SortBar";
import { CommentContainer } from "./CommentContainer";
import { COMMENTS_GET_URL } from '../constants/url_paths';
import { Stack } from "@mui/material";
import { PAGE_LENGTH } from "../constants/constants";

interface MainProps {
  site_url: string;
  user: User;
}

enum Views {
  Comments = 1,
  Error
}

export function MainContainer({ site_url, user }: MainProps) {
  const [threads, setThreads] = useState([{
    parent: null,
    replies: [],
    all_fetched: false
  }] as CommentThread[]);

  const [cur_view, setView] = useState(Views.Comments);
  const [sort_type, setSortType] = useState(SortType.Chronological);

  const cur_parent = threads.at(-1).parent;
  const comment_list = threads.at(-1).replies;
  const all_fetched = threads.at(-1).all_fetched;

  useEffect(() => {
    fetchNextCommentPage();
  }, []);

  useEffect(() => {
    if(threads.at(-1).replies.length === 0){
      fetchNextCommentPage([]);
    }
  }, [cur_parent]);

  const enterCommentThread = (parent: Comment) => {
    let thread: CommentThread = {
      parent: parent,
      replies: [],
      all_fetched: false
    }
    let new_threads = [...threads, thread];
    setThreads(new_threads);
  }

  const exitCommentThread = () => {
    setThreads(threads.slice(0, -1));
  }

  const setCurThread = (thread: CommentThread) => {
    let new_threads = [...threads];
    new_threads[new_threads.length - 1] = thread;
    setThreads(new_threads)
  }

  const updateCommentList = (new_comments: Comment[], all_fetched?: boolean) => {
    let new_threads = [...threads]
    new_threads.at(-1).replies = new_comments;
    if(all_fetched !== undefined){
      new_threads.at(-1).all_fetched = all_fetched
    }
    setThreads(new_threads);
  }

  const updateParent = (new_parent: Comment) => {
    let new_threads = [...threads];
    new_threads.at(-1).parent = new_parent;
    setThreads(new_threads);
  }

  const fetchNextCommentPage = (prev_comments = comment_list) => {
    console.log("Fetching next page!");
    let url = COMMENTS_GET_URL(site_url, prev_comments.length, PAGE_LENGTH, cur_parent?.comment_id);
    fetch(url)
    .then((res: Response) => res.json())
    .then((comments: Comment[]) => {
      let new_comments = [...prev_comments, ...comments];
      setCurThread({
        parent: cur_parent,
        replies: new_comments,
        all_fetched: (comments.length < PAGE_LENGTH)
      });

    })
    .catch(err => {
      console.error(err);
      setView(Views.Error);
    });
  }

  return (
    <div style={{height: "550px"}}>
      <Stack spacing={1}>
      <SortBar cur_sort_type={sort_type} set_sort_type={setSortType}/>
      {cur_view === Views.Comments && 
      <CommentContainer 
        comments={comment_list} 
        updateCommentList={updateCommentList} 
        updateParent={updateParent}
        fetchNextCommentPage={fetchNextCommentPage} 
        allCommentsFetched={all_fetched}
        enterCommentThread={enterCommentThread}
        exitCommentThread={exitCommentThread}
        cur_parent={cur_parent}
      />}
      {cur_view === Views.Error && <div> ERROR: Failed to fetch comments </div>}
      <CommentInput
        site_url={site_url} 
        user={user} 
        cur_comments={comment_list} 
        add_comment={updateCommentList}
        cur_parent={cur_parent}
      />
      </Stack>
    </div>
  );
}
