import React, { useState, useContext } from 'react';
import { Stack, Avatar, Popover, IconButton, Grid, Typography, useTheme } from '@mui/material';
import {deepOrange} from '@mui/material/colors';
import {ReactionContainer} from './ReactionContainer';
import { Comment } from '../constants/types';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import CommentIcon from '@mui/icons-material/Comment';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Heap from 'heap-js';
import { ReactionButton } from './ReactionButton';
import { UserContext} from '../UserContext';
import {TOGGLE_REACTION_URL} from '../constants/url_paths';

interface CommentProps {
    comment: Comment;
    updateComment: Function;
    isParent?: boolean;
    enterCommentThread?: (c: Comment) => void;
    exitCommentThread?: () => void;
}

const TOP_REACTIONS_LENGTH = 5;

export function CommentBox({comment, updateComment, isParent, enterCommentThread, exitCommentThread} : CommentProps) : JSX.Element {
    const user = useContext(UserContext);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const {reactions} = comment;

    const hasReacted = (reaction_id: number): boolean => (user.user_id in (reactions[reaction_id] || {}));

    const handleReactionsClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    const handleReactionsClose = () => {
      setAnchorEl(null);
    };

    const addReaction = (reaction_id: number) => {
      fetch(TOGGLE_REACTION_URL(comment.comment_id, reaction_id, user.user_id), {method: "PUT"})
      .then(res => {
        if(res.ok){
          if(!(reaction_id in reactions)){
            reactions[reaction_id] = {}
          }
          reactions[reaction_id][user.user_id] = user;
          updateComment(comment);
        }
      });
    }
  
    const removeReaction = (reaction_id: number) => {
      fetch(TOGGLE_REACTION_URL(comment.comment_id, reaction_id, user.user_id), {method: "DELETE"})
      .then(res => {
        if(res.ok){
          delete reactions[reaction_id][user.user_id];
          updateComment(comment);
        }
      });
    }
  
    const reaction_toggler = (reaction_id: number): Function => () => {
      if(hasReacted(reaction_id)){
        removeReaction(reaction_id);
      }else{
        addReaction(reaction_id);
      }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    let top_reactions: JSX.Element[] = [];
    const maxHeap = new Heap(Heap.maxComparator);
    maxHeap.init([]);
    for(let reaction_id in comment.reactions){
      let count = Object.keys(comment.reactions[reaction_id]).length;
      if(count > 0){
        maxHeap.push([count, reaction_id]);
      }
      while(maxHeap.size() > TOP_REACTIONS_LENGTH){
        maxHeap.pop();
      }
    }

    for(let r of maxHeap){
      // const [num_reacts, reaction_id] = <number[]>r;
      const num_reacts = (r as any)[0];
      const reaction_id = (r as any)[1];
      top_reactions.push((
        <ReactionButton
          reaction_id={reaction_id}
          num_reacts={num_reacts} 
          has_reacted={hasReacted(reaction_id)} 
          toggle={reaction_toggler(reaction_id)}     
        />
      ))
    }

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
          <div style={{
            transform: "scale(0.65)",
            transformOrigin: "left"
            }}>
            <Stack direction="row" spacing={3} >
            {top_reactions}
            </Stack>
          </div>
        </Grid>
        <Grid justifyContent="right" item xs>
          <Stack>
            <IconButton style={{float: "right"}} onClick={handleReactionsClick}>
              <AddReactionIcon fontSize="small"/>
            </IconButton>
            {isParent && 
              <IconButton style={{float: "right"}} onClick={(e) => exitCommentThread()}>
                <KeyboardReturnIcon fontSize="small"/>
              </IconButton>
            }
            {!isParent && 
            <IconButton style={{float: "right"}} onClick={(e) => enterCommentThread(comment)}>
                <CommentIcon fontSize="small"/>
                <div style={ {
                  position: "absolute",
                  right: 0,
                  bottom: "-3px",
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
          updateComment={updateComment}
        />
      </Popover>
    </div> 
  )
}
