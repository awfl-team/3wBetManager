import * as jwtdecode from 'jwt-decode';

export default class AuthService {
  static getUserInfo(token) {
    return jwtdecode(token);
  }

  static logout() {
    localStorage.removeItem('3wtoken');
  }

  static setTokenInLocalStorage(jwt) {
    const token = JSON.stringify(jwt);
    localStorage.setItem('3wtoken', token.replace(/['"]+/g, ''));
  }

  static getToken() {
    return localStorage.getItem('3wtoken');
  }
}
