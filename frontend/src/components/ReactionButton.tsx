import React from "react";
import { Icon, IconButton } from "@mui/material";
const openmoji = require('openmoji');



interface ReactionButtonProps {
  reaction_id: number;
  num_reacts: number;
  has_reacted: boolean;
  toggle: Function
}

//reaction_id={reaction_id} num_reacts={Object.keys(reactions[reaction_id]).length} has_reacted={has_reacted(reaction_id)} toggle={reaction_toggler(reaction_id)}


export function ReactionButton({
    reaction_id,
    num_reacts,
    has_reacted,
    toggle
}: ReactionButtonProps): JSX.Element {
    const src = `/dist/openmoji/${openmoji.openmojis[reaction_id].hexcode}.svg`
    const emojiIcon = (
        <>
            <Icon style={{transform: "scale(1.43)"}}>
                <img src={src}/>
            </Icon>
            <div style={ {
                position: "absolute",
                right: "-7px",
                bottom: 0,
                fontSize: "65%", 
                color: "black"
              }}>
                <b>{num_reacts}</b>
             </div>
        </>
    );

    return(

    <IconButton
    onClick={(e) => {toggle()}}
    size="small"
    >
        {emojiIcon}
    </IconButton>

    );
}
