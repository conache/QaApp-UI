import { request } from './request';
import { reject } from 'ramda';


export function getAnswers(params) {
  const { page, pageSize, questionId} = params;
  return request('GET', `answer/getAnswers?page=${page + 1}&size=${pageSize}&questionId=${questionId}`);
}

export function addAnswer(params) {
  return request('POST', 'answer/addAnswer', params);
}

export function updateAnswer(params) {
  return request('POST', 'answer/update', params);
}

export function deleteAnswer(id) {
  return new Promise((resolve, reject) => {
    resolve({});
  });
  return request('DELETE', `answer/deleteAnswer?answerId=${id}`);
}