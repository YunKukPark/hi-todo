import axios from 'axios';

const baseUrl = `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production`;

export const TodoApi = axios.create({ baseURL: `${baseUrl}/todos` });
TodoApi.defaults.headers.common[
  'Authorization'
] = `Bearer ${localStorage.getItem('accessToken')}`;

export const AuthApi = axios.create({ baseURL: `${baseUrl}/auth` });
