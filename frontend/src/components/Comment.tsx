import React, { ChangeEvent, FormEvent, useState } from 'react';
import { JsonObjectExpression } from 'typescript';
import { FormControl, Select, MenuItem, InputLabel, NativeSelect, Grid, Paper, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography} from '@mui/material';
import {deepOrange} from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import ReplyIcon from '@mui/icons-material/Reply';
import {ReactionContainer} from './ReactionContainer';

interface CommentProps {
    comment_body: string,
    username : string
    //comment_id : number
}

export function Comment({comment_body, username} : CommentProps) : JSX.Element {
  const [reactions, update_reactions] = useState({});
    return (     <div>
    <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>{username[0].toUpperCase()}</Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={username}
      secondary={
        <React.Fragment>
        {comment_body}
      </React.Fragment>
      }
    />
    <ReactionContainer/>
  </ListItem>
    <Divider variant="inset"/>
    
    
    </div> 
    
    

)
}