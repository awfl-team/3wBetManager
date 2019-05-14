import classnames from 'classnames';
import UserVerifyHelper from './UserVerifyHelper';

export default class UserFormClassnamesHelper {
  public static getClassNames(email: string,
                              username: string,
                              password: string,
                              confirmPassword: string) {
    const className: any = {};
    className.IsEmailGood = UserVerifyHelper.isEmailOk(email);
    className.isUsernameOk = UserVerifyHelper.isUsernameOk(username);
    className.isPasswordIdentical = UserVerifyHelper.isPasswordIdentical(password, confirmPassword);
    className.isPasswordNumberCharOk = UserVerifyHelper.isPasswordNumberChars(password);
    className.isPasswordSpecialChar = UserVerifyHelper.isPasswordSpecialChar(password);
    className.isPasswordUppercase = UserVerifyHelper.isPasswordUppercase(password);
    className.isPasswordWithNumber = UserVerifyHelper.isPasswordWithNumber(password);
    className.isPasswordOk = (className.isPasswordIdentical
      && className.isPasswordNumberCharOk
      && className.isPasswordSpecialChar
      && className.isPasswordUppercase
      && className.isPasswordWithNumber);

    className.isEnabled = (className.IsEmailGood && className.isUsernameOk
        && className.isPasswordNumberCharOk && className.isPasswordWithNumber
        && className.isPasswordSpecialChar && className.isPasswordUppercase
        && className.isPasswordIdentical);

    className.formFieldUsernameOk = classnames({
      'validate-form-info': className.isUsernameOk,
      'error-form-info': !className.isUsernameOk,
    });
    className.formFieldEmailOk = classnames({
      'validate-form-info': className.IsEmailGood,
      'error-form-info': !className.IsEmailGood,
    });
    className.formFieldIdentical = classnames({
      'validate-form-info': className.isPasswordIdentical,
      'error-form-info': !className.isPasswordIdentical,
    });
    className.formFieldNumber = classnames({
      'validate-form-info': className.isPasswordNumberCharOk,
      'error-form-info': !className.isPasswordNumberCharOk,
    });
    className.formdFieldUppercase = classnames({
      'validate-form-info': className.isPasswordUppercase,
      'error-form-info': !className.isPasswordUppercase,
    });
    className.formFieldSpecial = classnames({
      'validate-form-info': className.isPasswordSpecialChar,
      'error-form-info': !className.isPasswordSpecialChar,
    });
    className.formFieldWithNumber = classnames({
      'validate-form-info': className.isPasswordWithNumber,
      'error-form-info': !className.isPasswordWithNumber,
    });
    className.formMultipleInfos = classnames({
      'validate-form-info': className.isPasswordUppercase && className.isPasswordSpecialChar
      && className.isPasswordWithNumber,
      'error-form-info': !className.isPasswordUppercase
      || !className.isPasswordSpecialChar || !className.isPasswordWithNumber,
    });
    return className;
  }

  public static getClassNamesForPassword(password: string, confirmPassword: string) {
    const className: any = {};
    className.isPasswordIdentical = UserVerifyHelper.isPasswordIdentical(password, confirmPassword);
    className.isPasswordNumberCharOk = UserVerifyHelper.isPasswordNumberChars(password);
    className.isPasswordSpecialChar = UserVerifyHelper.isPasswordSpecialChar(password);
    className.isPasswordUppercase = UserVerifyHelper.isPasswordUppercase(password);
    className.isPasswordWithNumber = UserVerifyHelper.isPasswordWithNumber(password);

    className.isEnabled = (className.isPasswordNumberCharOk && className.isPasswordWithNumber
        && className.isPasswordSpecialChar && className.isPasswordUppercase
        && className.isPasswordIdentical);

    className.formFieldIdentical = classnames({
      'validate-form-info': className.isPasswordIdentical,
      'error-form-info': !className.isPasswordIdentical,
    });
    className.formFieldNumber = classnames({
      'validate-form-info': className.isPasswordNumberCharOk,
      'error-form-info': !className.isPasswordNumberCharOk,
    });
    className.formdFieldUppercase = classnames({
      'validate-form-info': className.isPasswordUppercase,
      'error-form-info': !className.isPasswordUppercase,
    });
    className.formFieldSpecial = classnames({
      'validate-form-info': className.isPasswordSpecialChar,
      'error-form-info': !className.isPasswordSpecialChar,
    });
    className.formFieldWithNumber = classnames({
      'validate-form-info': className.isPasswordWithNumber,
      'error-form-info': !className.isPasswordWithNumber,
    });
    className.formMultipleInfos = classnames({
      'validate-form-info': className.isPasswordUppercase && className.isPasswordSpecialChar
          && className.isPasswordWithNumber,
      'error-form-info': !className.isPasswordUppercase
          || !className.isPasswordSpecialChar || !className.isPasswordWithNumber,
    });
    return className;
  }

  public static refreshClassName(currentTypeHandle: string,
                                 currentHandle: string,
                                 currentMail: string, currentUsername: string,
                                 currentPassword: string, currentConfirmPassword: string) {
    const classnames = UserFormClassnamesHelper.getClassNames(
      currentTypeHandle === 'email' ? currentHandle : currentMail,
      currentTypeHandle === 'username' ? currentHandle : currentUsername,
      currentTypeHandle === 'password' ? currentHandle : currentPassword,
      currentTypeHandle === 'confirmPassword' ? currentHandle : currentConfirmPassword,
    );
    if (currentTypeHandle === 'password') {
      return { className: classnames, password: currentHandle };
    }
    if (currentTypeHandle === 'username') {
      return { className: classnames, username: currentHandle };
    }
    if (currentTypeHandle === 'confirmPassword') {
      return { className: classnames, confirmPassword: currentHandle };
    }
    if (currentTypeHandle === 'email') {
      return { className: classnames, email: currentHandle };
    }
    return null;
  }

  public static refreshClassNameForPassword(currentTypeHandle: string,
                                            currentHandle: string,
                                            currentPassword: string,
                                            currentConfirmPassword: string) {
    const classnames = UserFormClassnamesHelper.getClassNamesForPassword(
      currentTypeHandle === 'password' ? currentHandle : currentPassword,
      currentTypeHandle === 'confirmPassword' ? currentHandle : currentConfirmPassword,
    );
    if (currentTypeHandle === 'password') {
      return { className: classnames, password: currentHandle };
    }
    if (currentTypeHandle === 'confirmPassword') {
      return { className: classnames, confirmPassword: currentHandle };
    }
    return null;
  }
}
