import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import { ReactionButton } from "./ReactionButton";
import { Comment, User } from '../constants/types';
import { UserContext } from "../UserContext";
import SupportedReactions from "../constants/reaction_mappings";
import {TOGGLE_REACTION_URL} from '../constants/url_paths';
import { Paper, Divider } from "@mui/material";

const ROW_LENGTH: number = 5;

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


  let rows = []
  for(let i = 0; i < SupportedReactions.length; i += ROW_LENGTH){
    let row = SupportedReactions.slice(i, i + ROW_LENGTH).map((reaction_id, idx) => (
      <div key={idx}>
        <ReactionButton 
          reaction_id={reaction_id} 
          num_reacts={Object.keys(reactions[reaction_id] || {}).length} 
          has_reacted={has_reacted(reaction_id)} 
          toggle={reaction_toggler(reaction_id)}
        />
      </div>
    ));
    rows.push((
      <div>
        <Stack spacing={1} direction='row'>{row}</Stack>
        <Divider/>
      </div>
    ));
  }


  // let reaction_buttons = SupportedReactions.map((reaction_id, idx) => (
  //   <div key={idx}>
  //     <ReactionButton 
  //       reaction_id={reaction_id} 
  //       num_reacts={Object.keys(reactions[reaction_id] || {}).length} 
  //       has_reacted={has_reacted(reaction_id)} 
  //       toggle={reaction_toggler(reaction_id)}
  //     />
  //   </div>
  // ));

  return (
    <div style={{
      width: '250px',
      height: '90px'
    }}>
    <Stack spacing={1}>
      {rows}
    </Stack>
    </div>
  );
}