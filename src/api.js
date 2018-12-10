import axios from 'axios';
import AuthService from './service/AuthService';

const api = axios.create({
  // api c# url
  baseURL: 'http://localhost:9000/api/',
});

api.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    const configuration = config;
    if (token !== null) configuration.headers.Authorization = `Bearer${token}`;
    return configuration;
  },
  error => Promise.reject(error),
);

export default api;
