import api from '../api';
import User from '../model/User';

export default class UserService {
  public static login(email: string, password: string): Promise<any> {
    return api.post('login', {
      Email: email,
      Password: password,
    });
  }

  public static signUp(user: User) {
    return api.post('register', {
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
    });
  }

  public static addUserAdmin(user: User) {
    return api.post('users', {
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
      Role: user.Role,
    });
  }

  public static forgotPassword(user: User) {
    return api.post('forgot_password', user);
  }

  public static verifyAccount(user: User) {
    return api.put('verify_account', user);
  }

  public static resetPassword(user: User) {
    return api.put('reset_password', user);
  }

  public static getUserById(id: string) {
    return api.get(`users/${id}`);
  }

  public static getFromToken() {
    return api.get('users/token');
  }

  public static getAllUsers() {
    return api.get('users');
  }

  public static searchUsers(searchedTerm: string) {
    return api.get(`users/search/${searchedTerm}`);
  }

  public static getAllUsersPaginated(page: number = 1) {
    return api.get(`users/paginated/${page}`);
  }

  public static deleteUser(user: User) {
    return api.delete(`/users/${user.Id}`);
  }

  public static handleVisibilityUser(isPrivate: boolean) {
    return api.put('/users/visibility', {
      IsPrivate: isPrivate,
    });
  }

  public static updateRoleUser(user: User) {
    return api.put(`/users/${user.Id}/role`, {
      Role: user.Role,
    });
  }

  public static resetUser() {
    return api.put('/users/reset');
  }

  public static updateUser(user: User) {
    return api.put(`/users/${user.Id}`, {
      Email: user.Email,
      Password: user.Password,
      Username: user.Username,
    });
  }

  public static getTop50Betters() {
    return api.get('/users/top50');
  }

  public static getTop3() {
    return api.get('/users/top3');
  }

  public static getCurrentUserAmongSiblings() {
    return api.get('/users/place');
  }
}
