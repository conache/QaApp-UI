import { pick } from 'ramda';
import cookie from 'cookie';
import { __BASE_API_URL__ } from './environment.js';
import { request } from './api/request';

export function deleteSession() {
  document.cookie = 'Authorization=""'

  // TODO: Here we need to go to whatever route we want (e.g. landing page). Redirect landingpage
}

export const getToken = () => {
  const currentCookie = cookie.parse(document.cookie);
  // get token from cookie
  const tokenCookie = currentCookie.Authorization;

  if ((typeof tokenCookie) !== 'undefined' && tokenCookie !== undefined && tokenCookie !== '') {
    return tokenCookie;
  } 

  return null;
};


export const setToken = () => {
  request('get', '/user/token')
  .then((resp) => {
    console.log(resp);
    document.cookie=`Authorization=${resp}`;
  })
  .catch((error) => {
    console.error(error);
  })
}

export const pickAuthHeaders = pick(['Authorization']);
export const getSession = () => pickAuthHeaders(cookie.parse(document.cookie))
