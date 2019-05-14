export default class UserVerifyHelper {
  public static isEmailOk(value: string) {
    return (/^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_]+\.[A-Za-z]+$/.test(value));
  }

  public static isUsernameOk(value: string) {
    return value.length >= 3;
  }

  public static isPasswordNumberChars(password: string) {
    return (/.{12,}$/.test(password));
  }

  public static isPasswordSpecialChar(password: string) {
    return (/.*?[#?!@$%^&*-]/).test(password);
  }

  public static isPasswordUppercase(password: string) {
    return (/(?=.*[A-Z])/).test(password);
  }

  public static isPasswordIdentical(password: string, confirmPassword: string) {
    return password === confirmPassword && password !== '' && confirmPassword !== '';
  }

  public static isPasswordWithNumber(password: string) {
    return (/(?=.*\d)/.test(password));
  }
}
