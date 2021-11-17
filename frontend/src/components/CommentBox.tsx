import React, { useState } from 'react';
import { ListItem, Divider, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import {deepOrange} from '@mui/material/colors';
import {ReactionContainer} from './ReactionContainer';
import { Comment } from '../constants/types';

interface CommentProps {
    comment: Comment
    //comment_id : number
}

export function CommentBox({comment} : CommentProps) : JSX.Element {
  const [reactions, update_reactions] = useState({});
    return (     <div>
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
    <ReactionContainer/>
  </ListItem>
    <Divider variant="inset"/>
    
    
    </div> 
    
    

)
}