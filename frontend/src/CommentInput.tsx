import React from 'react';
import { JsonObjectExpression } from 'typescript';

interface Props {
    username: String,
    sitehash: String
};

export const CommentInput: React.FC<Props> = ({username, sitehash}) => {

    const requestOptions = (content: String) => {
        return JSON.stringify({
            method: 'POST',
            headers: {'Content-Type':'Application/json'},
            body: {'username':username,'sitehash':sitehash,'content':content}
        });
    }

    const onSubmit = () => {
        return;
    }

    return <div id="commentInput">
                <input type="text" id="content" placeholder ="What do you have to say about this?"/>
                <input type="submit" name="Post" onClick={onSubmit}/>
            </div>
}