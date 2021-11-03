import React, { ChangeEvent, FormEvent, useState } from 'react';
import { JsonObjectExpression } from 'typescript';
import { BASE_PATH, PAGE_COMMENTS_PATH } from '../constants'
import {TextField, Button} from '@mui/material';

interface CommentInputProps {
    site_url: string,
    username: string,
    cur_comments: string[],
    add_comment : Function
};

const requestOptions = (site_url : string, content:string) => {
    console.log(content);
    return {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'user_id':1,'url':site_url,'text':content})
    };
}

export function CommentInput({site_url, username, cur_comments, add_comment} : CommentInputProps) : JSX.Element {

    const [comment_body, setContent] = useState('');

    const contentDidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("new comment body: ", e.target.value);
        setContent(e.target.value);
    }

    const SubmitComment = () => {
        // fetch(PAGE_COMMENTS_PATH, requestOptions(site_url, comment_body));
        console.log(`Submitting comment = ${comment_body}`);
        console.log(`current list =  ${cur_comments}`);
        const new_comment_list = [...cur_comments, comment_body];
        add_comment(new_comment_list);
    }

    return (
        <div id="commentInput">

            <TextField id="comment-input-text" label="Outlined" variant="outlined"
            value={comment_body}
            onChange={contentDidChange} />

            <Button variant="contained" onClick={SubmitComment}>Submit</Button>

{/* 
            <form onSubmit={SubmitComment}>
                <label>
                    <input type="text" id="content" placeholder ="What do you have to say about this?"
                        value={comment_body} onChange={(e)=>contentDidChange(e)}/>
                    <input type="submit" name="Post"/>
                </label>
            </form> */}
        </div>
    );
    

}