import React, { ChangeEvent, FormEvent, useState } from 'react';
import { JsonObjectExpression } from 'typescript';
import { FormControl, Select, MenuItem, InputLabel, NativeSelect, Grid} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ReplyIcon from '@mui/icons-material/Reply';

interface CommentProps {
    comment_body : string
}

export function Comment({comment_body} : CommentProps) : JSX.Element {

    return (<div>

        <div>
            {comment_body}
        </div>
        {/* <Grid container spacing ={3}>
            <Grid item xs>
                <div>{PersonIcon}</div>
            </Grid>
            <Grid item xs={6}>
                <div>{comment_body}</div>
            </Grid>
            <Grid item xs={3}>
                <div>{ReplyIcon}</div>
            </Grid>
        </Grid> */}
    </div>)

}