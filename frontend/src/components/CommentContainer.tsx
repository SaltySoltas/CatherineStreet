import React from "react";
import { List } from "@mui/material";
import { Comment } from "../constants/types";
import { CommentBox } from "./CommentBox";

interface CommentContainerProps {
  comments: Comment[];
  update_comments: Function;
}


export function CommentContainer({comments} : CommentContainerProps) : JSX.Element {
  function get_current_page(comment_list: Comment[]): JSX.Element[] {
      return comment_list.map((comment, idx) => (<div key={idx}><CommentBox comment={comment}/></div>));
  }

  // const [comment_idx, update_comment_idx] = useState(0);
  let current_page = get_current_page(comments);
  console.log("current_page", current_page);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        maxHeight: 300,
        overflow: "auto",
      }}
    >
      {current_page}
    </List>
  );
}
