import React, { ChangeEvent, FormEvent, useState } from "react";
import { SortType } from "../constants";
import { CommentInput } from "./CommentInput";
import { SortBar } from "./SortBar";
import { CommentContainer } from "./CommentContainer";

interface MainProps {
  site_url: string;
  username: string;
}

export function MainContainer({ site_url, username }: MainProps) {
  //top bar, with sorting option and current sortin method
  //page of comments
  //commentInput
  const [sort_type, set_sort_type] = useState(SortType.Chronological);
  const [comment_list, update_comment_list] = useState([]);
  console.log(comment_list);
  return (
    <div id="MainContainer">
      <SortBar cur_sort_type={sort_type} set_sort_type={set_sort_type}/>
      <CommentContainer comments={comment_list}/>
      <CommentInput site_url={site_url} username={username} cur_comments={comment_list} add_comment={update_comment_list}/>
    </div>
  );
}
