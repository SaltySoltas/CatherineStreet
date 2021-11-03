import React, { ChangeEvent, FormEvent, useState } from 'react';
import { JsonObjectExpression } from 'typescript';
import { FormControl, Select, MenuItem, InputLabel, NativeSelect, Grid, Paper, ListItem, Divider, ListItemText} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ReplyIcon from '@mui/icons-material/Reply';

interface CommentProps {
    comment_body : string
}

export function Comment({comment_body} : CommentProps) : JSX.Element {

    return (     <div>
    <ListItem alignItems="flex-start">
    {/* <ListItemAvatar>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </ListItemAvatar> */}
    <ListItemText
      primary={comment_body}
    />
  </ListItem>
    <Divider variant="inset"/>
    
    
    </div> 
    
    

)
}