import React, { ChangeEvent } from 'react';
import { SortType } from '../constants/types';
import {convertStrToSortType} from '../constants/constants';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';


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
        console.log("new sort type: ", e.target.value, typeof e.target.value);
        set_sort_type(parseInt(e.target.value));
    }
    
    return (
        <div id="SortBar">
            <FormControl fullWidth>
            <InputLabel id="sort-selector-label">Sort By</InputLabel>
            <Select
                id="sort-selector"
                value={cur_sort_type}
                label="Sort By"
                onChange={sortTypeOnChange}
            >
                {Object.keys(SortType)
                    .filter(x => !isNaN(Number(x)))
                    .map(n => Number(n))
                    .map((n: number) => (
                        <MenuItem value={n}>{SortType[n].split(/(?=[A-Z])/).join(' ')}</MenuItem>
                    ))
                }
            </Select>
            </FormControl>
        </div>

    )

}