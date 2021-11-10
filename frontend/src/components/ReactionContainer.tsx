import React, { ChangeEvent, FormEvent, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import {ThumbUp, ThumbDown} from '@mui/icons-material';

interface ReactionContainerProps {
    comments: string[];
    comment_id: number
}
export function ReactionContainer() : JSX.Element {

//   let reaction_buttons = [];
//   for(let i = 0; i < 20; i++){
//     let j = i;
//     reaction_buttons.push(
//       <ReactionButton reaction_id={j} count={1} comment_id={comment_id}/>
//     )
//   }

    return (

        <Stack direction="row" spacing={1}>
          <IconButton aria-label="delete" color="success">
            <ThumbUp />
          </IconButton>
          <IconButton aria-label="delete" color="error">
            <ThumbDown />
          </IconButton>
        </Stack>
      );
}