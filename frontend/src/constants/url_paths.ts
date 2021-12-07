import uj from 'url-join';

export const URL_BASE = `http://${process.env.APP_DOMAIN}${process.env.PORT}`

export const API_BASE_URL = uj(URL_BASE, '/api');

export const COMMENTS_BASE_URL = uj(API_BASE_URL, 'comments');

export const COMMENTS_CREATE_URL = COMMENTS_BASE_URL;

export const COMMENTS_GET_URL = (url: string, start: number, limit: number, parent_id: number | null | undefined, sort_type: number) => {
    let ret = new URL(COMMENTS_BASE_URL);
    ret.searchParams.append("url", encodeURI(url));
    ret.searchParams.append("start", start.toString());
    ret.searchParams.append("limit", limit.toString());
    ret.searchParams.append("sort_type", sort_type.toString());
    if(typeof parent_id === 'number'){
        ret.searchParams.append("parent_id", parent_id.toString());
    }
    return ret.href;
}

export const TOGGLE_REACTION_URL = (comment_id: number, reaction_id: number, user_id: number) => {
    return uj(COMMENTS_BASE_URL, comment_id.toString(), "reactions", reaction_id.toString(), user_id.toString());
}

export const USERS_BASE_URL = uj(API_BASE_URL, 'users');

export const USERS_CREATE_URL = uj(USERS_BASE_URL, 'create');

export const USERS_GET_BY_GOOGLE_ID = (google_id: string) => {
    return uj(USERS_BASE_URL, "google", google_id);
}

export const LOGIN_BASE_URL = uj(API_BASE_URL, "login");

export const GOOGLE_LOGIN_URL = uj(LOGIN_BASE_URL, "google");