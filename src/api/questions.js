import { request } from './request';
const similar = [
  {
    questionId: 1,
    text: "A software engineer made a serious mistake in a cryptocurrency trading algorithm which caused my company to lose over 2 million USD. The CEO insists to fire him and sue him, but he is actually a pretty good developer. As the CTO, what should I do?",
  },
  {
    questionId: 2,
    text: "Why is Git so awful?"
  },
  {
    questionId: 3,
    text: "Is contributing to GitHub projects the only way a newbie programmer can get a job?"
  },
  {
    questionId: 4,
    text: "What are the 5 biggest myths about computer programmers?"
  }
];

export function getSimilarQuestions(text) {
  console.log("Request similar questions for ", text);
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(similar) }, 1000);
  });

  return request('GET', `search?text=${text}`);
}

export function addQuestion(params) {
  return request('POST', 'question/add', params);
}
export function getQuestion(id) {
  return request('GET', `question/find?questionId=${id}`);
}

export function getAllQuestions(params) {
  const {page, pageSize, tags, sortBy} = params;
  return request('GET', `question/findAll?page=${page + 1}&size=${pageSize}&sortBy=${sortBy}&tags=${tags.join(',')}`);
}

// export function getAllQuestions(params) {
//   return request('POST', `question/findAll`, params);
// }