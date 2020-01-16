import { request } from './request.js';

export function getAllTags(page=1, pageSize=10) {
  return request('GET', `company/tags?pageNumber=${page}&size=${pageSize}`);
}

export function addTag(params) {
  return request('POST', 'user/addTag', params);
}

export function editTag(params) {
  return request('PUT', 'company/editTag', params);
}

export function deleteTag(id) {
  return request('DELETE', `company/deleteTag?tagId=${id}`);
}

export function getProposedTags() {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

export function acceptProposedTag(id) {
  return new Promise((resolve, reject) => {
    reject({ message: "aa" });
  });
}

export function declineProposedTag(id) {
  return new Promise((resolve, reject) => {
    reject({ message: "aa" });
  });
}