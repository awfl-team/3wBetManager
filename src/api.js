import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import AuthHelper from './helpers/AuthHelper';
import { addSnackBar } from './actions/SnackBarActions';
import store from './store';


const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

loadProgressBar(null, api);

api.interceptors.request.use(
  (config) => {
    const token = AuthHelper.getToken();
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

  if (error.response && error.response.status === 404) {
    message = 'No records';
  }

  store.dispatch(addSnackBar(message, 'danger'));
  return Promise.reject(error);
}));

export default api;
