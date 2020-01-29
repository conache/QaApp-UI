import { request } from './request';
import { reject } from 'ramda';


export function getAnswers(params) {
  const { page, pageSize, questionId } = params;
  return request('GET', `answer/getAnswers?page=${page + 1}&size=${pageSize}&questionId=${questionId}`);
}

export function addAnswer(params) {
  return request('POST', 'answer/addAnswer', params);
}

export function voteAnswer(params) {
  const { answerId, questionId, isUpVote } = params;
  return request('PUT', `answer/vote?answerId=${answerId}&questionId=${questionId}&isUpVote=${isUpVote}`);
}

export function updateAnswer(params) {
  return request('POST', 'answer/update', params);
}

export function deleteAnswer(params) {
  const { answerId, questionId } = params;
  return request('DELETE', `answer/delete?answerId=${answerId}&questionId=${questionId}`);
}

export function markAnswerAsCorrect(params) {
  // return request('POST', 'answer/update', {...params, correct: true});
  return request('POST', 'answer/markCorrect', { ...params });
}