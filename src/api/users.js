import axios from 'axios';
import { __BASE_API_URL__ } from '../environment';
import {request} from '../api/request';

export function createUserAccount(data) {
  return request('POST', 'company/addUser', data);
}

export function getUserAccounts(page=1, pageSize=10) {
  return request('GET', `company/users?page=${page}&size=${pageSize}`);
}

export function removeUserAccount(id) {
  return request('DELETE', `company/deleteUser?userId=${id}`);
}

export function updateUserAccount(data) {
  return request('PUT', `company/editUser`, data);
}