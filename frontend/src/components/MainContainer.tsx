import React, { useState, useEffect } from "react";
import { SortType, Comment, User } from "../constants/types";
import { CommentInput } from "./CommentInput";
import { SortBar } from "./SortBar";
import { CommentContainer } from "./CommentContainer";
import { COMMENTS_GET_URL } from '../constants/url_paths';

interface MainProps {
  site_url: string;
  user: User;
}

enum Views {
  Comments = 1,
  Error
}

export function MainContainer({ site_url, user }: MainProps) {

  const [cur_view, changeView] = useState(Views.Comments);
  const [sort_type, set_sort_type] = useState(SortType.Chronological);
  const [comment_list, update_comment_list] = useState([]);

    //url, parent_id, start, limit
    useEffect(() => {
      let url = COMMENTS_GET_URL(site_url, 0, 10, null).toString();
      console.log("FETCH URL: ", url);
      fetch(url)
      .then((res: Response) => res.json())
      .then((comments: Comment[]) => {
        console.log("Fetched comments: ", comments);

        let new_comments = [...comment_list, ...comments];
        update_comment_list(new_comments);

      })
      .catch(err => {
        console.error(err);
        changeView(Views.Error);
      });
      
    }, []);

  //top bar, with sorting option and current sortin method
  //page of comments
  //commentInput
  console.log(comment_list);
  return (
    <div id="MainContainer">
      <SortBar cur_sort_type={sort_type} set_sort_type={set_sort_type}/>
      {cur_view === Views.Comments && <CommentContainer comments={comment_list} update_comment_list={update_comment_list}/>}
      {cur_view === Views.Error && <div> ERROR: Failed to fetch comments </div>}
      <CommentInput site_url={site_url} user={user} cur_comments={comment_list} add_comment={update_comment_list}/>
    </div>
  );
}
