import React, { ChangeEvent, FormEvent, useState } from 'react';
import { JsonObjectExpression } from 'typescript';
import { SortType, convertStrToSortType } from '../constants';
import { FormControl, Select, MenuItem, InputLabel, NativeSelect} from '@mui/material';


interface SortBarProps {
    cur_sort_type : SortType,
    set_sort_type : React.Dispatch<React.SetStateAction<SortType>>
};

const requestOptions = (site_url : String, content:String) => {
    console.log(content);
    return {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'user_id':1,'url':site_url,'text':content})
    };
}

export function SortBar({cur_sort_type, set_sort_type} : SortBarProps) : JSX.Element {

    //Profile ID, 

    const sortTypeOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("new sort type: ", e.target.value);
        set_sort_type(convertStrToSortType(e.target.value));
    }

    
    
    return (
        <div id="SortBar">
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                id="demo-simple-select"
                value={cur_sort_type}
                label="Sort Type"
                onChange={sortTypeOnChange}
            >s
                <MenuItem value={SortType.Chronological}>Chronological</MenuItem>
                <MenuItem value={SortType.MostUpvotes}>Most Upvotes</MenuItem>
                <MenuItem value={SortType.MostReactions}>Most Reactions</MenuItem>
                <MenuItem value={SortType.MyComments}>My Comments</MenuItem>
            </Select>
            </FormControl>
        </div>

    )

}