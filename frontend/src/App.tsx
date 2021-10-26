import React from 'react';
import { CommentInput } from './CommentInput';

interface AppProps {
    
};

export default function App(props : AppProps){
    return(
        <div> <a href="/a"> Hello New World!!!!! </a>
        <CommentInput username="Hello" siteurl="https://www.google.com"/>
         </div>
    );
}