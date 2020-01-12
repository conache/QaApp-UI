import { request } from './request.js';

export function getAllTags() {
  return new Promise((resolve, reject) => {
    reject({ message: "Could not fetch" });
  });
  //   return request('get', '/tags');
}

export function addTag(params) {
  return new Promise((resolve, reject) => {
    reject({ message: "aa" });
  });
  //   return request('delete', '/tags', params);
}

export function editTag(params) {
  return new Promise((resolve, reject) => {
    reject({ message: "aa" });
  });
  //   return request('delete', '/tags', params);
}

export function deleteTag(id) {
  return new Promise((resolve, reject) => {
    reject({ message: "aa" });
  });
  //   return request('delete', '/tags');
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