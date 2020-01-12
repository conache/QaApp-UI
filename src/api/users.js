import axios from 'axios';
import { __BASE_API_URL__ } from '../environment';

export function createUserAccount(data) {
  return new Promise((resolve, reject) => {
    resolve();
  });
  // return axios.post(`https://reqres.in/api/users`, data);
}

export function getUserAccounts(page=1, pageSize=5) {
  // return axios.get(`${__BASE_API_URL__}/users?per_page=${pageSize}&page=${page}`);
  return axios.get(`https://reqres.in/api/users?per_page=${pageSize}&page=${page}`);
}

export function removeUserAccount(id) {
  return new Promise((resolve, reject) => {
    reject({message: "asdasdasd"});
  });
  // return axios.delete(`https://reqres.in/api/users/${id}`);
}

export function updateUserAccount(id, data) {
  return new Promise((resolve, reject) => {
    reject({message: "test"});
  });
  // return axios.put(`https://reqres.in/api/users/${id}`, data);
}