import { CircularProgress } from "@mui/material";
import React, {useState, useEffect} from "react";
import { MainContainer } from "./components/MainContainer";
import { User } from "./constants/types";
import { GOOGLE_LOGIN_URL } from "./constants/url_paths";

enum Views {
  Loading = 1,
  App,
  Error
}

interface AppProps {}

export default function App(props: AppProps) {
  console.log("APP REFRESH");

  const loginRequestOptions = (token: string) => {
    return {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({token: token})
    };
}

  const doChromeLogin = () => {
    chrome.identity.getAuthToken({
      interactive: true
  }, function(token) {
      console.log(token);
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
        changeCurView(Views.Error);
        return;
      }
      fetch(GOOGLE_LOGIN_URL, loginRequestOptions(token))
      .then(res => {
        if(res.ok){
          return res.json();
        }else{
          throw new Error(res.statusText);
        }
      })
      .then(user => {
        changeUser(user.user);
        changeCurView(Views.App);
      })
      .catch(_ => {
        changeCurView(Views.Error);
      });
    });
  }

  const getCurUrlChrome = () => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
      console.log("Setting active url to ", url);
      changeCurUrl(url);
    });
  }

  // Init app by logging in based on current chrome profile
  useEffect(() => {
    // Chrome login
    if(!!chrome.identity){
      console.log("Detected chrome browser");
      getCurUrlChrome();
      doChromeLogin();
    }else{
      console.log("Unsupported browser detected");
    }
  }, []);

  const [curUser, changeUser] = useState(undefined as User);
  const [curUrl, changeCurUrl] = useState(undefined as string);
  const [curView, changeCurView] = useState(Views.Loading);

  return (
    <div style={{
      width: '300px',
      height: '600px'
    }}>
      <br/>
      {curView === Views.Loading && <CircularProgress />}
      {curView === Views.App && <MainContainer site_url={curUrl} user={curUser}/>}
      {curView === Views.Error && <div>Error: Could not log in. Make sure you are logged into your google account in the chrome browser</div>}
    </div>
  );
}
