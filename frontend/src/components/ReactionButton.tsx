import React from "react";
import { Badge, Icon, IconButton, Typography } from "@mui/material";
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
    const src = `/dist/openmoji/svg/${openmoji.openmojis[reaction_id].hexcode}.svg`
    console.log(src);
    const emojiIcon = (
        <Icon>
            <img src={src}/>
        </Icon>
    );

    return(
    // <div>
    // <IconButton
    //     onClick={(e) => {toggle()}}
    //     size="small"
    // >
    //     <div>
    //     {emojiIcon}
    //     <Typography variant="caption"><sub>{num_reacts}</sub></Typography>
    //     </div>
    // </IconButton>
    // </div>

    <Badge badgeContent={num_reacts.toString()} color="primary" overlap="circular">
        <IconButton
        onClick={(e) => {toggle()}}
        size="small"
        >
            {emojiIcon}
        </IconButton>
    </Badge>

    );
}
