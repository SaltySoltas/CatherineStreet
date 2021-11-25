import React, { useEffect, useState } from "react";
import { List, Divider, Stack, CircularProgress } from "@mui/material";
import { Comment } from "../constants/types";
import { CommentBox } from "./CommentBox";
import {cloneDeep} from 'lodash';
interface CommentContainerProps {
  cur_parent: Comment
  comments: Comment[];
  updateCommentList: (comments: Comment[]) => void;
  updateParent: (c: Comment) => void;
  fetchNextCommentPage: () => void;
  allCommentsFetched: boolean;
  enterCommentThread: (c: Comment) => void;
  exitCommentThread: () => void;
}

export function CommentContainer({
  comments, 
  updateCommentList, 
  updateParent,
  fetchNextCommentPage, 
  allCommentsFetched, 
  cur_parent, 
  enterCommentThread, 
  exitCommentThread} : CommentContainerProps) : JSX.Element {


  const [prevY, changePrevY] = useState(0);
  const [curY, changeCurY] = useState(0);

  var loadingRef: any = null;
  var observer: any = null;

  const  handleObserver = (entities: any, _: any) => {
    const y = entities[0].boundingClientRect.y;
    changeCurY(y);
  }

  useEffect(() => {
    console.log(`prevY = ${prevY}, curY = ${curY}`);
    if (prevY > curY) {
      fetchNextCommentPage();
    }
    changePrevY(curY);
  }, [curY]);

  useEffect(() => {
    if(!!loadingRef){
      observer = new IntersectionObserver(
        handleObserver,
        {
          root: null,
          rootMargin: "0px",
          threshold: 1.0
        }
      );
      observer.observe(loadingRef);
    }
  }, [cur_parent]);

  const comment_updater = (i: number) => {
    return (new_comment: Comment) => {
      let new_comments = cloneDeep(comments);
      new_comments[i] = new_comment;
      updateCommentList(new_comments);
    }
  }


  function generateCommentBoxes(comment_list: Comment[]): JSX.Element[] {
      return comment_list.map((comment, idx) => (
        <>
        <div key={idx}>
          <CommentBox 
            comment={comment}
            updateComment={comment_updater(idx)}
            enterCommentThread={enterCommentThread}
          />
        </div>
        {idx < comment_list.length - 1 && <Divider/>}
        </>));
  }

  let comment_boxes = generateCommentBoxes(comments);

  return (
    <div style={{
      height: "430px",
      width: "300px"
    }}>

      <Stack
        style={{
          width: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "scroll",
        }}
        spacing={2}
      >
        {cur_parent !== null && 
          <div key="parent_comment" style={{position: "sticky", top: 0, zIndex: 5}}>
            <div>
            <CommentBox
              comment={cur_parent}
              updateComment={updateParent}
              exitCommentThread={exitCommentThread}
              isParent
            />
            </div>
            <Divider/>
          </div>
        }
        {comment_boxes}
        {!allCommentsFetched && <div ref={lref => (loadingRef = lref)}>
          <CircularProgress/>
        </div>}
        {allCommentsFetched && <div>No more comments to display</div>}
      </Stack>
    </div>
  );
}
