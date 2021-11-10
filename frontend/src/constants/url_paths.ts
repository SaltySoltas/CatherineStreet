import uj from 'url-join';

export const URL_BASE = new URL(`http://${process.env.APP_DOMAIN}:${process.env.PORT}`)

export const API_BASE_URL = new URL(uj(URL_BASE.href, '/api'));

export const COMMENTS_BASE_URL = new URL(uj(API_BASE_URL.href, 'comments'));

export const COMMENTS_CREATE_URL = COMMENTS_BASE_URL;

export const COMMENTS_GET_URL = (url: string, start: number, limit: number, parent_id: number | null | undefined) => {
    let ret = new URL(COMMENTS_BASE_URL);
    ret.searchParams.append("url", encodeURI(url));
    ret.searchParams.append("start", start.toString());
    ret.searchParams.append("limit", limit.toString());
    if(typeof parent_id === 'number'){
        ret.searchParams.append("parent_id", parent_id.toString());
    }
    return ret;
}

export const USERS_BASE_URL = new URL(uj(API_BASE_URL.href, 'users'));

console.log("TEST URL: ", API_BASE_URL.href, COMMENTS_BASE_URL.href, COMMENTS_GET_URL("https://www.google.com", 0, 20, null).href);