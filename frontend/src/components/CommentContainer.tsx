import React, { useEffect, useState } from "react";
import { List, Divider, Stack, CircularProgress } from "@mui/material";
import { Comment } from "../constants/types";
import { CommentBox } from "./CommentBox";
import {cloneDeep} from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
interface CommentContainerProps {
  comments: Comment[];
  update_comment_list: (comments: Comment[]) => void;
  get_next_comment_page: () => void;
  allCommentsFetched: boolean;
}

export function CommentContainer({comments, update_comment_list, get_next_comment_page, allCommentsFetched} : CommentContainerProps) : JSX.Element {
  console.log("Cur comments: ", comments);

  const [prevY, changePrevY] = useState(0);
  const [curY, changeCurY] = useState(0);

  var loadingRef: any = null;
  var observer: any = null;

  const  handleObserver = (entities: any, _: any) => {
    const y = entities[0].boundingClientRect.y;
    changeCurY(y);
  }

  useEffect(() => {
    console.log("comp ", prevY, curY);
    if (prevY > curY) {
      get_next_comment_page();
    }
    changePrevY(curY);
  }, [curY]);

  useEffect(() => {
    console.log("prevY is ", prevY)
  }, [prevY]);

  useEffect(() => {
    observer = new IntersectionObserver(
      handleObserver,
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
      }
    );
    observer.observe(loadingRef);
  }, []);

  const comment_updater = (i: number) => {
    return (new_comment: Comment) => {
      let new_comments = cloneDeep(comments);
      new_comments[i] = new_comment;
      update_comment_list(new_comments);
    }
  }


  function generate_comment_boxes(comment_list: Comment[]): JSX.Element[] {
      return comment_list.map((comment, idx) => (
        <>
        <div key={idx}>
          <CommentBox 
            comment={comment}
            update_comment={comment_updater(idx)}
          />
        </div>
        {idx < comment_list.length - 1 && <Divider/>}
        </>));
  }

  // const [comment_idx, update_comment_idx] = useState(0);
  let comment_boxes = generate_comment_boxes(comments);
  console.log("current_page", comment_boxes);

  console.log("prevY currently = ", prevY);

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
        {comment_boxes}
        {!allCommentsFetched && <div ref={lref => (loadingRef = lref)}>
          <CircularProgress/>
        </div>}
        {allCommentsFetched && <div>No more comments to display</div>}
      </Stack>
    </div>
  );
}
