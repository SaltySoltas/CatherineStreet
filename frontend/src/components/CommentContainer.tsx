import React from "react";
import { List } from "@mui/material";
import { Comment } from "../constants/types";
import { CommentBox } from "./CommentBox";

interface CommentContainerProps {
  comments: Comment[];
  update_comments: Function;
}

function get_current_page(comment_list: Comment[]): JSX.Element[] {
  //Fetch Comment JSON

  //fetch num_comments from db
  //get results
  //create comment componnent given results
  //return list of comment components

  return;
}

export function CommentContainer({
  comments,
  update_comments,
}: CommentContainerProps): JSX.Element {

  // const [comment_idx, update_comment_idx] = useState(0);
  let current_page: JSX.Element[] = comments.map((comment, idx) => (
    <div key={idx}>
      <CommentBox
        comments={comments}
        comment_idx={idx}
        update_comments={update_comments}
      />
    </div>
  ));

  
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
