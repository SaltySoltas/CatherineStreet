import React, { ChangeEvent, FormEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { Reaction } from "../constants/types";
import {ReactionButton} from "./ReactionButton";

interface ReactionContainerProps {
  reactions: Reaction[];
  comment_idx: number;
  update_reactions: Function;
}
export function ReactionContainer({reactions, comment_idx, update_reactions}: ReactionContainerProps): JSX.Element {

    let reaction_buttons = reactions.map( (e, i) => {
      <ReactionButton reaction={e} reaction_idx={i} comment_id={comment_idx} update_reactions={update_reactions}/>
    })

  return (
    <Stack direction="row" spacing={1}>
      {reaction_buttons}
    </Stack>
  );
}