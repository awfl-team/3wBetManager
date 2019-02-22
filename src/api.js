import axios from 'axios';
import AuthService from './service/AuthService';
import { addSnackBar } from './actions/SnackBarActions';
import store from './store';


const api = axios.create({
  // api c# url   baseURL: 'http://151.80.136.92:9000/',
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    const configuration = config;
    if (token !== null) configuration.headers.Authorization = `Bearer ${token}`;
    return configuration;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(null, ((error) => {
  let message = 'Connection lost with the server :(';
  if (error.response) {
    message = error.response.data.Message ? error.response.data.Message : error.response.data;
  }
  store.dispatch(addSnackBar(message, 'danger'));
  return Promise.reject(error);
}));

export default api;
