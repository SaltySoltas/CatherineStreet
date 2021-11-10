import React, { ChangeEvent, FormEvent, useState } from "react";
import { JsonObjectExpression } from "typescript";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  NativeSelect,
  Grid,
  Paper,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import ReplyIcon from "@mui/icons-material/Reply";
import { ReactionContainer } from "./ReactionContainer";
import { Reaction, Comment } from "../constants/types";

interface CommentProps {
  comments: Comment[];
  comment_idx: number;
  update_comments: Function;
}

export function CommentBox({
  comments,
  comment_idx,
  update_comments,
}: CommentProps): JSX.Element {

  let { comment_text, first_name, reactions } : Comment = comments[comment_idx];

  const [current_reactions, update_reactions] = useState(reactions);


  const reactionsDidChange = (reaction_idx: number) => {
    let new_reactions = [...current_reactions]
    ++new_reactions[reaction_idx].clicks;
    update_reactions(new_reactions);
    let new_comments = [...comments];
    new_comments[comment_idx].reactions = current_reactions;
    update_comments(new_comments);
  }


  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {first_name[0].toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={first_name}
          secondary={<React.Fragment>{comment_text}</React.Fragment>}
        />
        <ReactionContainer
          reactions={current_reactions}
          comment_idx={comment_idx}
          update_reactions={reactionsDidChange}
        />
      </ListItem>
      <Divider variant="inset" />
    </div>
  );
}
