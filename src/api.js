import axios from 'axios';

const api = axios.create({
  // api c# url
  baseURL: 'http://localhost:9000/api/',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    const configuration = config;
    if (token) configuration.headers.Authorization = `Bearer${token}`;
    return configuration;
  },
  error => Promise.reject(error),
);

export default api;
