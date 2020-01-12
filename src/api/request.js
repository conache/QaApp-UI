import axios from 'axios';
import { mergeDeepLeft } from 'ramda';
import { getToken } from '../session';
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

export function request(method = 'GET', url, params = '') {
  const authHeader = {
    // Authorization: getToken(),
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiM2Q4MzkwNS1iY2YyLTQ0OWUtYmU5OC0wYjZlNWM0ZmI2ZDIifQ.eyJqdGkiOiI3YTRlNWZiYi1hYTc0LTQyM2ItYjRmNS05M2JhMzY1NGQyNjAiLCJleHAiOjE1Nzg4MjIwNjMsIm5iZiI6MCwiaWF0IjoxNTc4Nzg2MDYzLCJpc3MiOiJodHRwOi8vZWMyLTMtMjAtOTktMTAzLnVzLWVhc3QtMi5jb21wdXRlLmFtYXpvbmF3cy5jb206ODA4MC9hdXRoL3JlYWxtcy9xYS1wbGF0Zm9ybS1yZWFsbSIsInN1YiI6IjM4YmUwZTcyLWM1ZjYtNDY3MC05OWFkLWJmYzYwYTJmMDI1MSIsInR5cCI6IlNlcmlhbGl6ZWQtSUQiLCJhdXRoX3RpbWUiOjAsInNlc3Npb25fc3RhdGUiOiJiYzBjYmViOC0wNDFlLTQ5MDUtYmZhYS1kNGJjODdlYWFhMTkiLCJzdGF0ZV9jaGVja2VyIjoiN1lwYzNQQnUtYVliWjZQOEZ1aDhYYUlQUThvQ2cySHFEejhKdEYwZXMzVSJ9.OqTkcX2vnDeBTOviXxJvMFiPWz_aw_CweNd7UNLcXVM',
  }

  return axios({
    method,
    url: createFullUrl(url),
    data: params,
    headers: mergeDeepLeft(defaultHeaders, authHeader),
    crossDomain: true,
  });
}
