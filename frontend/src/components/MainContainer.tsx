import React, { useState, useEffect } from "react";
import { SortType, Comment, User } from "../constants/types";
import { CommentInput } from "./CommentInput";
import { SortBar } from "./SortBar";
import { CommentContainer } from "./CommentContainer";
import { COMMENTS_GET_URL } from '../constants/url_paths';
import { Paper, Stack } from "@mui/material";
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

  const [cur_parent, changeParent] = useState(null as number);
  const [cur_view, changeView] = useState(Views.Comments);
  const [sort_type, set_sort_type] = useState(SortType.Chronological);
  const [comment_list, update_comment_list] = useState([]);
  const [allCommentsFetched, setAllCommentsFetched] = useState(false);

    const fetchNextCommentPage = () => {
      console.log("Fetching comments", comment_list.length, PAGE_LENGTH, cur_parent);
      let url = COMMENTS_GET_URL(site_url, comment_list.length, PAGE_LENGTH, cur_parent);
      fetch(url)
      .then((res: Response) => res.json())
      .then((comments: Comment[]) => {
        if(comments.length === 0){
          setAllCommentsFetched(true);
        }else{
          let new_comments = [...comment_list, ...comments];
          update_comment_list(new_comments);
        }

      })
      .catch(err => {
        console.error(err);
        changeView(Views.Error);
      });
    }

    //url, parent_id, start, limit
    useEffect(() => {
      fetchNextCommentPage();
    }, []);

  //top bar, with sorting option and current sortin method
  //page of comments
  //commentInput
  console.log(comment_list);
  return (
    <div style={{height: "550px"}}>
      <Stack spacing={1}>
      <SortBar cur_sort_type={sort_type} set_sort_type={set_sort_type}/>
      {cur_view === Views.Comments && 
      <CommentContainer 
        comments={comment_list} 
        update_comment_list={update_comment_list} 
        get_next_comment_page={fetchNextCommentPage} 
        allCommentsFetched={allCommentsFetched}
      />}
      {cur_view === Views.Error && <div> ERROR: Failed to fetch comments </div>}
      <CommentInput
        site_url={site_url} 
        user={user} 
        cur_comments={comment_list} 
        add_comment={update_comment_list}
      />
      </Stack>
    </div>
  );
}
