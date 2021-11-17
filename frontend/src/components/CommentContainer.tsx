import React from "react";
import { List } from "@mui/material";
import { Comment } from "../constants/types";
import { CommentBox } from "./CommentBox";
import {cloneDeep} from 'lodash';
interface CommentContainerProps {
  comments: Comment[];
  update_comment_list: Function;
}

export function CommentContainer({comments, update_comment_list} : CommentContainerProps) : JSX.Element {
  console.log("Cur comments: ", comments);

  const comment_updater = (i: number) => {
    return (new_comment: Comment) => {
      let new_comments = cloneDeep(comments);
      new_comments[i] = new_comment;
      update_comment_list(new_comments);
    }
  }



  function get_current_page(comment_list: Comment[]): JSX.Element[] {
      return comment_list.map((comment, idx) => (
        <div key={idx}>
          <CommentBox 
            comment={comment}
            update_comment={comment_updater(idx)}
          />
        </div>));
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
