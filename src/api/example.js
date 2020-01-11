import { axios } from 'axios';

export function getUserAccount() {
  return axios.get('/example/12345');
}