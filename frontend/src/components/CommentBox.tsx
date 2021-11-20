import React, { useState } from 'react';
import { ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Popover, IconButton, Grid, Paper, Typography } from '@mui/material';
import {deepOrange} from '@mui/material/colors';
import {ReactionContainer} from './ReactionContainer';
import { Comment } from '../constants/types';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { AnyNaptrRecord } from 'dns';

interface CommentProps {
    comment: Comment
    update_comment: Function
    //comment_id : number
}

export function CommentBox({comment, update_comment} : CommentProps) : JSX.Element {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (     
      <div>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>{comment.first_name[0].toUpperCase()}</Avatar>
        </Grid>
        <Grid justifyContent="left" item xs={8} zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: "left" }}>{comment.first_name} {comment.last_name}</h4>
          <Typography variant="body2" style={{ textAlign: "left" }}>
            {comment.comment_text}
          </Typography>
        </Grid>
        <Grid justifyContent="right" item xs>
          <IconButton style={{float: "right"}} onClick={handleClick}>
            <AddReactionIcon/>
          </IconButton>
        </Grid>
      </Grid>
      <Popover 
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ReactionContainer
          comment={comment}
          update_comment={update_comment}
        />
      </Popover>
    </div> 
  )
}
