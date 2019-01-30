import axios from 'axios';
import AuthService from './service/AuthService';
import { addSnackBar } from './actions/SnackBarActions';
import store from './store';


const api = axios.create({
  // api c# url
  baseURL: 'http://localhost:9000/',
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
  store.dispatch(addSnackBar(error.response ? error.response.data : 'Connection lost with the'
      + ' server :(', 'danger'));
  return Promise.reject(error);
}));

export default api;
