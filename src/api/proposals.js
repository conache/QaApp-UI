import { request } from './request.js';

export function getProposal(id) {
  return request('GET', `question/findProposed?proposedQuestionId=${id}`);
}

export function getProposals(page, pageSize) {
  // this should be replaced by another endpoint
  return request('GET', `question/proposedQuestions?page=${page + 1}&size=${pageSize}`);
}

export function acceptProposal(id) {
  return request('POST', `question/acceptProposed?proposedQuestionId=${id}`);
}

export function declineProposal(id) {
  return request('DELETE', `question/deleteProposed?proposedQuestionId=${id}`);
}