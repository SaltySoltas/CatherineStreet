import React, { ChangeEvent, FormEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { ThumbUp, ThumbDown } from "@mui/icons-material";
import { Reaction } from "../constants/types";
import { Button } from "@mui/material";
//const openmoji = require('openmoji');


interface ReactionButtonProps {
reaction: Reaction;
  comment_id: number;
  update_reactions : Function
  reaction_idx: number;
}


export function ReactionButton({
    reaction,
    reaction_idx,
    comment_id,
    update_reactions
}: ReactionButtonProps): JSX.Element {
    //  > const openmoji = require('openmoji')
    //> const om = openmoji.openmojis[0]
    //> om.emoji

    let {id, clicks} : Reaction = reaction;

  

    return(
        <Button onClick={update_reactions(reaction_idx)}>{`${id} ${clicks}`}</Button>
    );
}
