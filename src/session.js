import { __BASE_API_URL__ } from './environment.js';

export const getAuthToken = () => localStorage.getItem("token");
export const setAuthToken = (token) => localStorage.setItem("token", token);