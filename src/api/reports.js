import {request} from './request';

const reports = {
  page: 1,
  total: 3,
  data: [
    {
      id: 3,
      text: "This is a question",
      type: "question",
      author: {
        first_name: "Test",
        last_name: "Name",
        email: "tname@gmail.com"
      }
    },
    {
      id: 2,
      text: "This is a question2",
      type: "question",
      author: {
        first_name: "Test",
        last_name: "Name",
        email: "tname@gmail.com"
      }
    },
    {
      id: 1,
      text: "This is a question3",
      type: "question",
      author: {
        first_name: "Test",
        last_name: "Name",
        email: "tname@gmail.com"
      }
    }
  ]
};

export function getReports(page=1, pageSize=10) {
  return new Promise((resolve, reject) => {
    resolve(reports);
  })
  // return request('get', '/reports');
}

export function deleteReport(id) {
  reports = reports.slice(0, -1);
  return new Promise((resolve, reject) => {
    resolve();
  })
  // return request('delete', `?id=${id}`);
}