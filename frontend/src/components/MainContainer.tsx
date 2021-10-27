import React, { ChangeEvent, FormEvent, useState } from "react";
import { SortType } from "../constants";
import { CommentInput } from "./CommentInput";
import { SortBar } from "./SortBar";

interface MainProps {
  site_url: string;
  username: string;
}

export function MainContainer({ site_url, username }: MainProps) {
  //top bar, with sorting option and current sortin method
  //page of comments
  //commentInput
  const [sort_type, set_sort_type] = useState(SortType.Chronological);

  return (
    <div id="MainContainer">
      <SortBar cur_sort_type={sort_type} set_sort_type={set_sort_type}/>
      <CommentInput site_url={site_url} username={username} />
    </div>
  );
}
