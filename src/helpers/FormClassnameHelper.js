import classNames from 'classnames/bind';
import VerifyUserHelper from './VerifyUserHelper';

export default class FormClassnameHelper {
  static getClassNames(email, username, password, confirmPassword) {
    const className = {};
    className.IsEmailGood = VerifyUserHelper.isEmailOk(email);
    className.isUsernameOk = VerifyUserHelper.isUsernameOk(username);
    className.isPasswordIdentical = VerifyUserHelper.isPasswordIdentical(password, confirmPassword);
    className.isPasswordNumberCharOk = VerifyUserHelper.isPasswordNumberChars(password);
    className.isPasswordSpecialChar = VerifyUserHelper.isPasswordSpecialChar(password);
    className.isPasswordUppercase = VerifyUserHelper.isPasswordUppercase(password);
    className.isPasswordWithNumber = VerifyUserHelper.isPasswordWithNumber(password);
    className.isPasswordOk = (className.isPasswordIdentical
      && className.isPasswordNumberCharOk
      && className.isPasswordSpecialChar
      && className.isPasswordUppercase
      && className.isPasswordWithNumber);

    className.isEnabled = (className.IsEmailGood && className.isUsernameOk
        && className.isPasswordNumberCharOk && className.isPasswordWithNumber
        && className.isPasswordSpecialChar && className.isPasswordUppercase
        && className.isPasswordIdentical);

    className.formFieldUsernameOk = classNames({
      'validate-form-info': className.isUsernameOk,
      'error-form-info': !className.isUsernameOk,
    });
    className.formFieldEmailOk = classNames({
      'validate-form-info': className.IsEmailGood,
      'error-form-info': !className.IsEmailGood,
    });
    className.formFieldIdentical = classNames({
      'validate-form-info': className.isPasswordIdentical,
      'error-form-info': !className.isPasswordIdentical,
    });
    className.formFieldNumber = classNames({
      'validate-form-info': className.isPasswordNumberCharOk,
      'error-form-info': !className.isPasswordNumberCharOk,
    });
    className.formdFieldUppercase = classNames({
      'validate-form-info': className.isPasswordUppercase,
      'error-form-info': !className.isPasswordUppercase,
    });
    className.formFieldSpecial = classNames({
      'validate-form-info': className.isPasswordSpecialChar,
      'error-form-info': !className.isPasswordSpecialChar,
    });
    className.formFieldWithNumber = classNames({
      'validate-form-info': className.isPasswordWithNumber,
      'error-form-info': !className.isPasswordWithNumber,
    });
    className.formMultipleInfos = classNames({
      'validate-form-info': className.isPasswordUppercase && className.isPasswordSpecialChar
      && className.isPasswordWithNumber,
      'error-form-info': !className.isPasswordUppercase
      || !className.isPasswordSpecialChar || !className.isPasswordWithNumber,
    });
    return className;
  }

  static getClassNamesForPassword(password, confirmPassword) {
    const className = {};
    className.isPasswordIdentical = VerifyUserHelper.isPasswordIdentical(password, confirmPassword);
    className.isPasswordNumberCharOk = VerifyUserHelper.isPasswordNumberChars(password);
    className.isPasswordSpecialChar = VerifyUserHelper.isPasswordSpecialChar(password);
    className.isPasswordUppercase = VerifyUserHelper.isPasswordUppercase(password);
    className.isPasswordWithNumber = VerifyUserHelper.isPasswordWithNumber(password);

    className.isEnabled = (className.isPasswordNumberCharOk && className.isPasswordWithNumber
        && className.isPasswordSpecialChar && className.isPasswordUppercase
        && className.isPasswordIdentical);

    className.formFieldIdentical = classNames({
      'validate-form-info': className.isPasswordIdentical,
      'error-form-info': !className.isPasswordIdentical,
    });
    className.formFieldNumber = classNames({
      'validate-form-info': className.isPasswordNumberCharOk,
      'error-form-info': !className.isPasswordNumberCharOk,
    });
    className.formdFieldUppercase = classNames({
      'validate-form-info': className.isPasswordUppercase,
      'error-form-info': !className.isPasswordUppercase,
    });
    className.formFieldSpecial = classNames({
      'validate-form-info': className.isPasswordSpecialChar,
      'error-form-info': !className.isPasswordSpecialChar,
    });
    className.formFieldWithNumber = classNames({
      'validate-form-info': className.isPasswordWithNumber,
      'error-form-info': !className.isPasswordWithNumber,
    });
    className.formMultipleInfos = classNames({
      'validate-form-info': className.isPasswordUppercase && className.isPasswordSpecialChar
          && className.isPasswordWithNumber,
      'error-form-info': !className.isPasswordUppercase
          || !className.isPasswordSpecialChar || !className.isPasswordWithNumber,
    });
    return className;
  }

  static refreshClassName(currentTypeHandle,
    currentHandle, currentMail, currentUsername,
    currentPassword, currentConfirmPassword) {
    const classnames = FormClassnameHelper.getClassNames(
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

  static refreshClassNameForPassword(currentTypeHandle,
    currentHandle,
    currentPassword, currentConfirmPassword) {
    const classnames = FormClassnameHelper.getClassNamesForPassword(
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
