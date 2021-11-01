import React, { ChangeEvent, FormEvent, useState } from 'react';
import { JsonObjectExpression } from 'typescript';
import { FormControl, Select, MenuItem, InputLabel, NativeSelect} from '@mui/material';
import { Comment } from './Comment';

interface CommentContainerProps {
    comments: string[];
}

function get_current_page(comment_list: string[]){
    //Fetch Comment JSON

    //fetch num_comments from db
    //get results
    //create comment componnent given results
    //return list of comment components
    
    return comment_list.map(cur_body => <Comment comment_body={cur_body}/>);
    
}

export function CommentContainer({comments} : CommentContainerProps) : JSX.Element {
    // const [comment_idx, update_comment_idx] = useState(0);
    let current_page = get_current_page(comments);
    console.log("current_page", current_page)


    
    return (<div> 
        {current_page}
        </div>);

}