const baseUrl = `http://localhost:8000`;
// const baseUrl = {
//   local: `localhost:8000`,
//   prod: `https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production`,
// };

const auth = {
  signup: `${baseUrl}/auth/signup`,
  signin: `${baseUrl}/auth/signin`,
};

// TODO: Axios instance 만들기
const todo = {
  read: `${baseUrl}/todos`,
  update: (id: number) => `${baseUrl}/todos/${id}`,
};

const api = { auth, todo };

export default api;
