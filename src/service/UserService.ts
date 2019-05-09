import API from '../api';
import User from "../model/User";

export default class UserService {


  static signUp(user: User) {
    return API.post('register', {
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
    });
  }

  static addUserAdmin(user: User) {
    return API.post('users', {
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
      Role: user.Role,
    });
  }

  static forgotPassword(user: User) {
    return API.post('forgot_password', user);
  }

  static verifyAccount(user: User) {
    return API.put('verify_account', user);
  }

  static resetPassword(user: User) {
    return API.put('reset_password', user);
  }

  static getUserById(id: string) {
    return API.get(`users/${id}`);
  }

  static getFromToken() {
    return API.get('users/token');
  }

  static getAllUsers() {
    return API.get('users');
  }

  static searchUsers(searchedTerm: string) {
    return API.get(`users/search/${searchedTerm}`);
  }

  static getAllUsersPaginated(page: number = 1) {
    return API.get(`users/paginated/${page}`);
  }

  static deleteUser(user: User) {
    return API.delete(`/users/${user.Id}`);
  }

  static handleVisibilityUser(isPrivate: boolean) {
    return API.put('/users/visibility', {
      IsPrivate: isPrivate,
    });
  }

  static updateRoleUser(user: User) {
    return API.put(`/users/${user.Id}/role`, {
      Role: user.Role,
    });
  }

  static resetUser() {
    return API.put('/users/reset');
  }

  static updateUser(user: User) {
    return API.put(`/users/${user.Id}`, {
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
    });
  }

  static getTop50Betters() {
    return API.get('/users/top50');
  }

  static getTop3() {
    return API.get('/users/top3');
  }

  static getCurrentUserAmongSiblings() {
    return API.get('/users/place');
  }
}
