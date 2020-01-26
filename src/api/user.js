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
  // this should be replaced by another endpoint (for user)
  return request('GET', `question/findAll?page=${page + 1}&size=${pageSize}`);
}