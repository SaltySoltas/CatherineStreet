import React, {useState} from "react";
import { CommentInput } from "./components/CommentInput";
import { MainContainer } from "./components/MainContainer";

interface AppProps {}

export default function App(props: AppProps) {
  console.log("APP REFRESH");

  const [username, changeUsername] = useState('Default User');
  return (
    <div>
      <button onClick={e => {
        changeUsername(prompt("Log in as: "));
      }}>
        Login
      </button>
      <br/>
      <MainContainer site_url="google.com" username={username} />
    </div>
  );
}
