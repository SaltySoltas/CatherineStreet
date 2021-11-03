import React from "react";
import { CommentInput } from "./components/CommentInput";
import { MainContainer } from "./components/MainContainer";

interface AppProps {}

export default function App(props: AppProps) {
  console.log("APP REFRESH");
  return (
    <div>
      <MainContainer site_url="google.com" username="wsoltas" />
    </div>
  );
}
