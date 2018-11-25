import API from '../api';
import AuthService from './AuthService';

// example axios request
export default class UserService {
  static findAll() {
    API.get('/users')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static login(email, password) {
    return API.post('/users/login', {
      Email: email,
      Password: password,
    })
      .then((response) => {
        AuthService.setTokenInLocalStorage(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static signUp(user) {
    return API.post('/users/register', {
      user,
    })
      .then(() => {
        this.login(user.email, user.password);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
