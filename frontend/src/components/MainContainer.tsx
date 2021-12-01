import React, { useState, useEffect, useRef } from "react";
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
    all_fetched: false,
    scroll_pos: 0
  }] as CommentThread[]);

  const [cur_view, setView] = useState(Views.Comments);
  const [sort_type, setSortType] = useState(SortType.Chronological);

  const prev_threads_length = usePrevious(threads.length);

  const cur_parent = threads.at(-1).parent;
  const comment_list = threads.at(-1).replies;
  const all_fetched = threads.at(-1).all_fetched;

  function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  useEffect(() => {
    fetchNextCommentPage();
  }, []);

  useEffect(() => {
    if(threads.at(-1).replies.length === 0){
      fetchNextCommentPage([]);
    }
  }, [cur_parent]);

  useEffect(() => {
    if(threads.length === (prev_threads_length || 1) - 1){
      let scroll_container = document.getElementById("comments_scrollable_container");
      if(!!scroll_container){
        scroll_container.scrollTop = threads.at(-1).scroll_pos;
      }
    }
  }, [threads])

  const enterCommentThread = (parent: Comment) => {
    let thread: CommentThread = {
      parent: parent,
      replies: [],
      all_fetched: false,
      scroll_pos: 0
    }
    let new_threads = [...threads, thread];
    setThreads(new_threads);
  }

  const exitCommentThread = () => {
    setThreads(threads.slice(0, -1));
  }

  const setScrollPos = (pos: number) => {
    setCurThread({
      ...threads.at(-1),
      scroll_pos: pos
    })
  }

  const setCurThread = (thread: CommentThread) => {
    let new_threads = [...threads];
    new_threads[new_threads.length - 1] = thread;
    setThreads(new_threads)
  }

  const addComment = (new_comment: Comment) => {
    if(!!cur_parent){
      cur_parent.replies += 1;
    }
    updateCommentList([
      ...comment_list,
      new_comment
    ]);
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
        all_fetched: (comments.length < PAGE_LENGTH),
        scroll_pos: 0
      });

    })
    .catch(err => {
      console.error(err);
      setView(Views.Error);
    });
  }

  console.log(threads);

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
        setScrollPos={setScrollPos}
      />}
      {cur_view === Views.Error && <div> ERROR: Failed to fetch comments </div>}
      <CommentInput
        site_url={site_url} 
        user={user} 
        cur_comments={comment_list} 
        addComment={addComment}
        cur_parent={cur_parent}
      />
      </Stack>
    </div>
  );
}
