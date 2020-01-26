import { request } from './request.js';

export function getProposals(page, pageSize) {
  // this should be replaced by another endpoint
  return request('GET', `question/findAll?page=${page + 1}&size=${pageSize}`);
}

export function acceptProposal(id) {
  return new Promise((resolve, reject) => {
    reject({message: "Not implemented yet"});
  })
}

export function declineProposal(id) {
  return new Promise((resolve, reject) => {
    reject({message: "Not implemented yet"});
  })
}