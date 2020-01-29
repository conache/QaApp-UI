import { request } from './request.js';

export function getAllActiveTags() {
  return request('GET', `user/allTags`);
}

export function getAllTags(page=1, pageSize=10) {
  return request('GET', `user/tags?page=${page}&size=${pageSize}`);
}

export function getProposedTags(page=1, pageSize=10) {
  return request('GET', `company/tags?pageNumber=${page}&size=${pageSize}`);
}

export function addTag(params) {
  return request('POST', 'company/addTag', params);
}

export function editTag(params) {
  return request('PUT', 'company/editTag', params);
}

export function deleteTag(id) {
  return request('DELETE', `company/deleteTag?tagId=${id}`);
}

export function acceptProposedTag(id) {
  return request('PUT', `company/acceptTag?tagId=${id}`);
}

export function declineProposedTag(id) {
  return request('PUT', `company/declineTag?tagId=${id}`);
}