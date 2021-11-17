import React from 'react';
import { List} from '@mui/material';
import { Comment } from '../constants/types';
import { CommentBox } from './CommentBox';

interface CommentContainerProps {
    comments: Comment[];
}

function get_current_page(comment_list: any[]){
    //Fetch Comment JSON

    //fetch num_comments from db
    //get results
    //create comment componnent given results
    //return list of comment components
    
    return comment_list.map((comment, idx) => (<div key={idx}><CommentBox comment={comment}/></div>));
    
}

export function CommentContainer({comments} : CommentContainerProps) : JSX.Element {
    // const [comment_idx, update_comment_idx] = useState(0);
    let current_page = get_current_page(comments);
    console.log("current_page", current_page);

    


    
    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto' }}> 
        {current_page}
        </List>);

}