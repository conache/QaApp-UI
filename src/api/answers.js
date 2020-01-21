import { request } from './request';


export function getAnswers(params) {
  const { page, pageSize, tags, sortBy } = params;
  // return request('GET', `question/findAll?page=${page + 1}&size=${pageSize}&sortBy=${sortBy}&tags=${tags.join(',')}`);
  return new Promise((resolve, reject) => {
    reject({ message: 'my error' });
  })
}

export function addAnswer(params) {
  return new Promise((resolve) => {
    resolve();
  })
  // return request('POST', 'question/add', params);
}