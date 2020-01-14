import { request } from './request.js';

export function getAllTags(page=1, pageSize=10) {
  return new Promise((resolve, reject) => {
    reject({ message: "Could not fetch" });
  });
  return request('GET', `/tags?page=${page}&size=${pageSize}`);
}

export function addTag(params) {
  return new Promise((resolve, reject) => {
    reject({ message: "aa" });
  });
  return request('POST', '/addTag', params);
}

export function editTag(params) {
  return new Promise((resolve, reject) => {
    reject({ message: "aa" });
  });
  return request('PUT', '/editTag', params);
}

export function deleteTag(id) {
  return new Promise((resolve, reject) => {
    reject({ message: "aa" });
  });
  return request('DELETE', `/deleteTag?tagId=${id}`);
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