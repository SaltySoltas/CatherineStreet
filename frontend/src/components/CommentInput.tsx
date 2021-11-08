import React, { useState } from 'react';
import {Comment} from '../constants/types'
import {TextField, Button} from '@mui/material';

interface CommentInputProps {
    site_url: string,
    username: string,
    cur_comments: Comment[],
    add_comment : Function
};

const requestOptions = (site_url : string, content:string, parent_id?:number ) => {
    console.log(content);
    return {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'user_id':1,'url':site_url,'text':content, 'parent_id':parent_id})
        //{user_id, url, text, parent_id}
    };
}

export function CommentInput({site_url, username, cur_comments, add_comment} : CommentInputProps) : JSX.Element {

    const [comment_body, setContent] = useState('');

    const contentDidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("new comment body: ", e.target.value);
        setContent(e.target.value,);
        console.log(comment_body);
    }

    const SubmitComment = () => {
        fetch("/api/comments", requestOptions(site_url, comment_body))
        .then(res => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
            console.log(`Submitting comment = ${comment_body}`);
            console.log(`current list =  ${cur_comments}`);
            const new_comment_list =  [{body: comment_body, username: username}, ...cur_comments];
            setContent('');
            add_comment(new_comment_list);
        })
        .catch(err => {
            alert(err);
        });

    }

    return (
        <div id="commentInput">

            <TextField id="comment-input-text" label="Add a comment" variant="outlined"
            value={comment_body}
            onChange={contentDidChange} />

            <Button variant="contained" disabled={comment_body===''} onClick={SubmitComment}>Submit</Button>

        </div>
    );
    

}