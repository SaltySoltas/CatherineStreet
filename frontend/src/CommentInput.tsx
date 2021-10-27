import React, { ChangeEvent, FormEvent, useState } from 'react';
import { JsonObjectExpression } from 'typescript';

interface Props {
    username: String,
    siteurl: String
};

export const CommentInput: React.FC<Props> = ({username, siteurl}) => {

    const [content, setContent] = useState('');

    const contentDidChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('value: %s', e.target.value);
        setContent(e.target.value);
    }

    const requestOptions = () => {
        console.log(content);
        return {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({'user_id':1,'url':siteurl,'text':content})
        };
    }

    const onSubmit = () => {
        fetch("http://localhost:8080/api/comments/", requestOptions())
        return;
    }

    return <div id="commentInput">
                <input type="text" id="content" placeholder ="What do you have to say about this?"
                 value={content} onChange={(e)=>contentDidChange(e)}/>
                <input type="submit" name="Post" onClick={onSubmit}/>
            </div>
}