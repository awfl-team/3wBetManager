import API from '../api';

export default class UserService {
  static login(email, password) {
    return API.post('/users/login', {
      Email: email,
      Password: password,
    });
  }

  static signUp(user) {
    return API.post('/users/register', {
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
    });
  }
}
