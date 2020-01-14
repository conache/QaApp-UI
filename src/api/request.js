import axios from 'axios';
import { mergeDeepLeft } from 'ramda';
import { getAuthToken } from '../session';
import { __BASE_API_URL__ } from '../environment';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'X-Requested-With", "Origin", "Content-Type", "Accept"',
};

const prefix = '/';
function createFullUrl(url) {
  return `${__BASE_API_URL__}${prefix}${url}`;
}

export function request(method = 'GET', url, body = '') {
  const authHeader = {
    Authorization: `Bearer ${getAuthToken()}`,
  }

  return axios({
    method,
    url: createFullUrl(url),
    data: body,
    headers: mergeDeepLeft(defaultHeaders, authHeader),
    crossDomain: true,
  });
}
