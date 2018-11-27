import * as jwtdecode from 'jwt-decode';

export default class AuthService {
  static getUserInfo(token) {
    return jwtdecode(token);
  }

  static logout() {
    localStorage.removeItem('3wtoken');
  }

  static setTokenInLocalStorage(loginResponse) {
    const token = JSON.stringify(loginResponse.data);
    localStorage.setItem('3wtoken', token);
  }

  static getToken() {
    return localStorage.getItem('3wtoken');
  }
}
