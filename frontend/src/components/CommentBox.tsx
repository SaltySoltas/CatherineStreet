import React, { useState } from 'react';
import { Stack, Avatar, Popover, IconButton, Grid, Typography, useTheme } from '@mui/material';
import {deepOrange} from '@mui/material/colors';
import {ReactionContainer} from './ReactionContainer';
import { Comment } from '../constants/types';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CommentIcon from '@mui/icons-material/Comment';

interface CommentProps {
    comment: Comment;
    update_comment: Function;
    changeParent: (paren: Comment) => void;
    isParent?: boolean;
}

export function CommentBox({comment, update_comment, changeParent, isParent} : CommentProps) : JSX.Element {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleReactionsClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    const handleReactionsClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (     
      <div style={{
        background: theme.palette.background.paper,
        zIndex: 1
      }}>
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
          <Stack>
            <IconButton style={{float: "right"}} onClick={handleReactionsClick}>
              <AddReactionIcon fontSize="small"/>
            </IconButton>
            {!isParent && 
            <IconButton style={{float: "right"}} onClick={(e) => changeParent(comment)}>
                <CommentIcon fontSize="small"/>
                <div style={ {
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  fontSize: "50%", 
                }}>
                  {comment.replies}
               </div>
            </IconButton>
            }
          </Stack>
        </Grid>
      </Grid>
      <Popover 
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleReactionsClose}
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
