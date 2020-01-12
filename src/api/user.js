import { request } from './request.js';

export function getUserProfile() {
  return request('get', 'user/currentUser');
}

export function logout() {
  return request('delete', '/logout');
}