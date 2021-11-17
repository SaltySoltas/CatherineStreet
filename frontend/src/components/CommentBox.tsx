import React, { useState } from 'react';
import { ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import {deepOrange} from '@mui/material/colors';
import {ReactionContainer} from './ReactionContainer';
import { Comment } from '../constants/types';

interface CommentProps {
    comment: Comment
    update_comment: Function
    //comment_id : number
}

export function CommentBox({comment, update_comment} : CommentProps) : JSX.Element {
    return (     
      <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>{comment.first_name[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={comment.first_name + ' ' + comment.last_name}
          secondary={
            <React.Fragment>
            {comment.comment_text}
          </React.Fragment>
          }
        />
        <ReactionContainer
          comment={comment}
          update_comment={update_comment}
        />
      </ListItem>
      <Divider variant="inset"/>
    </div> 
  )
}
