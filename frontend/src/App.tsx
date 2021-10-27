import React from "react";
import { CommentInput } from "./components/CommentInput";
import { MainContainer } from "./components/MainContainer";

interface AppProps {}

export default function App(props: AppProps) {
  return (
    <div>
      <a href="/a"> Hello New World!! </a>
      <MainContainer site_url="google.com" username="wsoltas" />
    </div>
  );
}
