import jwtDecode from 'jwt-decode';

export default class AuthService {
  static getUserInfo(token: string) {
    return jwtDecode(token);
  }

  static logout() {
    localStorage.removeItem('3wtoken');
  }

  static setTokenInLocalStorage(jwt: string) {
    const token = JSON.stringify(jwt);
    localStorage.setItem('3wtoken', token.replace(/['"]+/g, ''));
  }

  static getToken() {
    return localStorage.getItem('3wtoken');
  }
}
