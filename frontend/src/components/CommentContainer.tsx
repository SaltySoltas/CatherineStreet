import React, { ChangeEvent, FormEvent, useState } from 'react';
import { JsonObjectExpression } from 'typescript';
import { FormControl, Select, MenuItem, InputLabel, NativeSelect,Divider, List} from '@mui/material';
import { BASE_PATH, PAGE_COMMENTS_PATH } from '../constants'
import { Comment } from './Comment';

interface CommentContainerProps {
    comments: {
        body: string, 
        username: string
    }[];
}

const requestOptions = (site_url : string, content:string) => {
    console.log(content);
    return {
        method: 'GET',
        headers: {'Content-Type':'application/json', 'Accept':'application/json'},
        body: JSON.stringify({'url': site_url, 'start': 0, 'limit': 30})
    };
}

function get_current_page(comment_list: any[]){
    //Fetch Comment JSON

    //fetch num_comments from db
    //get results
    //create comment componnent given results
    //return list of comment components
    
    return comment_list.map(comment => (<div><Comment comment_body={comment.body} username={comment.username}/></div>));
    
}

export function CommentContainer({comments} : CommentContainerProps) : JSX.Element {
    // const [comment_idx, update_comment_idx] = useState(0);
    let current_page = get_current_page(comments);
    console.log("current_page", current_page)


    
    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto' }}> 
        {current_page}
        </List>);

}