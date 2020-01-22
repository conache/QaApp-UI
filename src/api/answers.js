import { request } from './request';


export function getAnswers(params) {
  const { page, pageSize, questionId} = params;
  return request('GET', `answer/getAnswers?page=${page + 1}&size=${pageSize}&questionId=${questionId}`);
}

export function addAnswer(params) {
  return request('POST', 'answer/addAnswer', params);
}


