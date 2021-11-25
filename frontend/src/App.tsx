import { CircularProgress, createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import React, {useState, useEffect} from "react";
import { MainContainer } from "./components/MainContainer";
import { User } from "./constants/types";
import { GOOGLE_LOGIN_URL } from "./constants/url_paths";
import { UserProvider } from "./UserContext";

export const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

const theme = createTheme(themeOptions);

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
        setCurView(Views.Error);
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
        setCurUser(user.user);
        setCurView(Views.App);
      })
      .catch(_ => {
        setCurView(Views.Error);
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
      setCurUrl(url);
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
      setCurView(Views.Error);
    }
  }, []);

  const [cur_user, setCurUser] = useState(undefined as User);
  const [cur_url, setCurUrl] = useState(undefined as string);
  const [cur_view, setCurView] = useState(Views.Loading);

  return (
    <UserProvider value={cur_user}>
      <ThemeProvider theme={theme}>
          <br/>
          {cur_view === Views.Loading && <CircularProgress />}
          {cur_view === Views.App && <MainContainer site_url={cur_url} user={cur_user}/>}
          {cur_view === Views.Error && <div>Error: Could not log in. Make sure you are logged into your google account in the chrome browser</div>}
        </ThemeProvider>
    </UserProvider>
  );
}
