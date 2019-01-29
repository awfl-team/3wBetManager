import API from '../api';

export default class UserService {
  static login(email, password) {
    return API.post('login', {
      Email: email,
      Password: password,
    });
  }

  static signUp(user) {
    return API.post('register', {
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
    });
  }

  static getFromToken() {
    return API.get('users/token');
  }

  static deleteUser(user) {
    return API.delete(`/users/${user.Id}`);
  }

  static handleVisibilityUser(user, isPrivate) {
    return API.put(`/users/${user.Id}/visibility`, {
      IsPrivate: isPrivate,
    });
  }

  static resetUser(user) {
    return API.put(`/users/${user.Id}/reset`);
  }

  static updateUser(user) {
    return API.put(`/users/${user.Id}`, {
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
    });
  }
}
