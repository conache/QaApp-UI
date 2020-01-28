import { request } from './request.js';

export function getUserProfile() {
  return request('get', 'user/currentUser');
}

export function logout() {
  return request('delete', '/logout');
}

export function setCompanyGroup(name) {
  return request('post', `company/addGroup?name=${name}`);
}

export function getQuestions(page, pageSize) {
  return request('GET', `user/questions?page=${page + 1}&size=${pageSize}`);
}