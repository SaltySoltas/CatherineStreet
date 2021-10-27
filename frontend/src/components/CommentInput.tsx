import React, { ChangeEvent, FormEvent, useState } from 'react';
import { JsonObjectExpression } from 'typescript';
import { BASE_PATH, PAGE_COMMENTS_PATH } from '../constants'

interface CommentInputProps {
    site_url: String,
    username: String,
};

const requestOptions = (site_url : String, content:String) => {
    console.log(content);
    return {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'user_id':1,'url':site_url,'text':content})
    };
}

export function CommentInput({site_url, username} : CommentInputProps) : JSX.Element {

    const [comment_body, setContent] = useState('');

    const contentDidChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("new comment body: ", e.target.value);
        setContent(e.target.value);
    }

    const SubmitComment = () => {
        // fetch(PAGE_COMMENTS_PATH, requestOptions(site_url, comment_body));
        console.log("Fetch!");
    }

    return (
        <div id="commentInput">
            <form onSubmit={SubmitComment}>
                <label>
                    <input type="text" id="content" placeholder ="What do you have to say about this?"
                        value={comment_body} onChange={(e)=>contentDidChange(e)}/>
                    <input type="submit" name="Post"/>
                </label>
            </form>
        </div>
    );
    

}