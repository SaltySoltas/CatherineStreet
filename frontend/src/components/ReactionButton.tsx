import React from "react";
import { Button, Icon } from "@mui/material";
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
    //  > const openmoji = require('openmoji')
    //> const om = openmoji.openmojis[0]
    //> om.emoji
    const src = `/dist/openmoji/svg/${openmoji.openmojis[reaction_id].hexcode}.svg`
    console.log(src);
    const emojiIcon = (
        <Icon>
            <img src={src}/>
        </Icon>
    );

    return(
    <Button 
        variant={has_reacted?"contained":"outlined"} 
        startIcon={emojiIcon} 
        onClick={(e) => {
            console.log("clicked!");
            toggle();
        }}
    >
        {num_reacts}
    </Button>
    );
}
