import React, { useState } from 'react';
import {Comment, User} from '../constants/types'
import {TextField, Button, Paper, Stack, Divider} from '@mui/material';
import { COMMENTS_CREATE_URL } from '../constants/url_paths';

interface CommentInputProps {
    site_url: string;
    user: User;
    cur_comments: Comment[];
    add_comment : Function;
    cur_parent: Comment;
};


export function CommentInput({site_url, user, cur_comments, add_comment, cur_parent} : CommentInputProps) : JSX.Element {

    const requestOptions = (site_url : string, content:string, parent_id?:number ) => {
        console.log(content);
        return {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({'user_id':user.user_id,'url':site_url,'text':content, 'parent_id':parent_id})
            //{user_id, url, text, parent_id}
        };
    }

    const [comment_body, setContent] = useState('');

    const contentDidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("new comment body: ", e.target.value);
        setContent(e.target.value,);
        console.log(comment_body);
    }

    const SubmitComment = () => {
        fetch(COMMENTS_CREATE_URL, requestOptions(site_url, comment_body, cur_parent?.comment_id))
        .then(res => {
            if(!res.ok){
                throw new Error(res.statusText);
            }
           return res.json();
        })
        .then(res => {
            console.log(res);
            console.log(`Submitting comment = ${comment_body}`);
            console.log(`current list =  ${cur_comments}`);
            const new_comment_list =  [
                {
                    comment_text: comment_body, 
                    first_name: user.first_name,
                    comment_id: res.comment_id,
                    last_name: user.last_name, 
                    reactions: {}
                }, 
                 ...cur_comments];
            setContent('');
            add_comment(new_comment_list);
        })
        .catch(err => {
            alert(err);
        });

    }

    return (
        <Paper id="commentInput" style={{
            position: "absolute",
            bottom: 0,
            border: '5px black',
            width: "100%"
          }}>
            <Divider/>
            <Stack direction="row" spacing={3}>

                <TextField id="comment-input-text" label="Add a comment" variant="outlined"
                value={comment_body}
                onChange={contentDidChange} />

                <Button variant="contained" disabled={comment_body===''} onClick={SubmitComment}>Submit</Button>

            </Stack>

        </Paper>
    );
    

}