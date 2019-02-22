import API from '../api';
// TODO create async method
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

  static addUserAdmin(user) {
    return API.post('users/new', {
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
      Role: user.Role,
    });
  }

  static getUserById(id) {
    return API.get(`users/${id}`);
  }

  static getFromToken() {
    return API.get('users/token');
  }

  static getAllUsers() {
    return API.get('users');
  }

  static searchUsers(searchedTerm) {
    return API.get(`users/search/${searchedTerm}`);
  }

  static getAllUsersPaginated(page = 1) {
    return API.get(`users/paginated/${page}`);
  }

  static deleteUser(user) {
    return API.delete(`/users/${user.Id}`);
  }

  static handleVisibilityUser(isPrivate) {
    return API.put('/users/visibility', {
      IsPrivate: isPrivate,
    });
  }

  static updateRoleUser(user) {
    return API.put(`/users/${user.Id}/role`, {
      Role: user.Role,
    });
  }

  static resetUser() {
    return API.put('/users/reset');
  }

  static updateUser(user) {
    return API.put(`/users/${user.Id}`, {
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
    });
  }

  static getTop50Betters() {
    return API.get('/users/top50');
  }
}
