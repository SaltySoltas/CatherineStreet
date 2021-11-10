import React, {useState} from "react";
import { CommentInput } from "./components/CommentInput";
import { MainContainer } from "./components/MainContainer";
import {User} from './constants/types';

interface AppProps {}

export default function App(props: AppProps) {
  console.log("APP REFRESH");

  const [curUser, changeUser] = useState({
    first_name: "John",
    last_name: "Doe",
    user_id: 1,
    username: "temp"
  });
  console.log(document.location.href)
  return (
    <div>
      <button onClick={e => {
        changeUser({...curUser, username: prompt("Log in as: ")});
      }}>
        Login
      </button>
      <br/>
      <MainContainer site_url={document.location.href} user={curUser} />
    </div>
  );
}
