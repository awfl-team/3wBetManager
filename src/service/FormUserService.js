import classNames from 'classnames/bind';
import VerifyService from './VerifyService';

export default class FormUserService {
  static getClassNames(email, username, password, confirmPassword) {
    const className = {};
    className.IsEmailGood = VerifyService.isEmailOk(email);
    className.isUsernameOk = VerifyService.isUsernameOk(username);
    className.isPasswordIdentical = VerifyService.isPasswordIdentical(password, confirmPassword);
    className.isPasswordNumberCharOk = VerifyService.isPasswordNumberChars(password);
    className.isPasswordSpecialChar = VerifyService.isPasswordSpecialChar(password);
    className.isPasswordUppercase = VerifyService.isPasswordUppercase(password);
    className.isPasswordWithNumber = VerifyService.isPasswordWithNumber(password);

    className.isEnabled = (className.IsEmailGood && className.isUsernameOk && className.isPasswordNumberCharOk && className.isPasswordWithNumber
        && className.isPasswordSpecialChar && className.isPasswordUppercase && className.isPasswordIdentical);

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

  static refreshClassName(currentTypeHandle,
    currentHandle, currentMail, currentUsername,
    currentPassword, currentConfirmPassword) {
    const classnames = FormUserService.getClassNames(
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
  }
}
