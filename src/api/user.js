import { request } from './request.js';

export function getUserInfo() {
  return request('get', '/user/currentUser');
}

export function logout() {
  return request('delete', '/logout');
}