export default class VerifyService {
  static isEmailOk(value) {
    return (/^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_]+\.[A-Za-z]+$/.test(value));
  }

  static isUsernameOk(value) {
    return value.length >= 3;
  }

  static isPasswordNumberChars(password) {
    return (/.{12,}$/.test(password));
  }

  static isPasswordSpecialChar(password) {
    return (/.*?[#?!@$%^&*-]/).test(password);
  }

  static isPasswordUppercase(password) {
    return (/(?=.*[A-Z])/).test(password);
  }

  static isPasswordIdentical(password, confirmPassword) {
    return password === confirmPassword && password !== '' && confirmPassword !== '';
}
  static isPasswordWithNumber(password) {
    return (/(?=.*\d)/.test(password));
  }

}
