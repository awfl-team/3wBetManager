export default class VerifyService {
  static isEmailOk(value) {
    return (/^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_]+\.[A-Za-z]+$/.test(value));
  }

  static isUsernameOk(value) {
    return value.length >= 6;
  }

  static isPasswordOk(password, confirmPassword) {
    return password === confirmPassword && password !== ''
        && confirmPassword !== '' && password.length >= 6 && confirmPassword.length >= 6;
  }

  static passwordSize(value) {
    return value.length >= 6;
  }
}
