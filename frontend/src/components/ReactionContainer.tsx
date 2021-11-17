import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import { ReactionButton } from "./ReactionButton";
import { Comment, User } from '../constants/types';
import { UserContext } from "../UserContext";
import SupportedReactions from "../constants/reaction_mappings";
import {TOGGLE_REACTION_URL} from '../constants/url_paths';

function _copy(a: any): any {
  return JSON.parse(JSON.stringify(a));
}

interface ReactionContainerProps {
  comment: Comment;
  update_comment: Function;
}
export function ReactionContainer({ comment, update_comment }: ReactionContainerProps): JSX.Element {

  const user = useContext(UserContext);

  let { reactions }: Comment = comment;

  const has_reacted = (reaction_id: number): boolean => (user.user_id in (reactions[reaction_id] || {}));

  const add_reaction = (reaction_id: number) => {
    fetch(TOGGLE_REACTION_URL(comment.comment_id, reaction_id, user.user_id), {method: "PUT"})
    .then(res => {
      if(res.ok){
        if(!(reaction_id in reactions)){
          reactions[reaction_id] = {}
        }
        reactions[reaction_id][user.user_id] = user;
        update_comment(comment);
      }
    });
  }

  const remove_reaction = (reaction_id: number) => {
    // Fetch (POST)
    fetch(TOGGLE_REACTION_URL(comment.comment_id, reaction_id, user.user_id), {method: "DELETE"})
    .then(res => {
      if(res.ok){
        delete reactions[reaction_id][user.user_id];
        update_comment(comment);
      }
    });
  }

  const reaction_toggler = (reaction_id: number): Function => () => {
    console.log("clicked ", reaction_id, _copy(comment), has_reacted(reaction_id));
    if(has_reacted(reaction_id)){
      console.log("Removing ", reaction_id);
      remove_reaction(reaction_id);
    }else{
      console.log("Adding ", reaction_id);
      add_reaction(reaction_id);
    }
    console.log(_copy(comment));
  }

  let reaction_buttons = SupportedReactions.map((reaction_id, idx) => (
    <div key={idx}>
      <ReactionButton 
        reaction_id={reaction_id} 
        num_reacts={Object.keys(reactions[reaction_id] || {}).length} 
        has_reacted={has_reacted(reaction_id)} 
        toggle={reaction_toggler(reaction_id)}
      />
    </div>
  ));

  return (
    <Stack spacing={1}>
      {reaction_buttons}
    </Stack>
  );
}