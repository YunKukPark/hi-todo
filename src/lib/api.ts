import axios from 'axios';

const baseUrl = {
  auth: `http://localhost:8000/auth`,
  todos: `http://localhost:8000/todos`,
};

export const TodoApi = axios.create({ baseURL: baseUrl.todos });
TodoApi.defaults.headers.common[
  'Authorization'
] = `Bearer ${localStorage.getItem('accessToken')}`;

export const AuthApi = axios.create({ baseURL: baseUrl.auth });
