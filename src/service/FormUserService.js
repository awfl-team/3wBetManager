import classNames from 'classnames/bind';
import VerifyService from './VerifyService';

export default class FormUserService {
  static getClassNames(email, username, password, confirmPassword) {
    const className = {};
    className.IsEmailOk = VerifyService.isEmailOk(email);
    className.isUsernameOk = VerifyService.isUsernameOk(username);
    className.isPasswordIdentical = VerifyService.isPasswordIdentical(password, confirmPassword);
    className.isPasswordNumberCharOk = VerifyService.isPasswordNumberChars(password);
    className.isPasswordSpecialChar = VerifyService.isPasswordSpecialChar(password);
    className.isPasswordUppercase = VerifyService.isPasswordUppercase(password);
    className.isPasswordWithNumber = VerifyService.isPasswordWithNumber(password);

    className.isEnabled = (className.isEmailOk && className.isUsernameOk && className.isPasswordNumberCharOk && className.isPasswordWithNumber
        && className.isPasswordSpecialChar && className.isPasswordUppercase && className.isPasswordIdentical);
    className.formFieldUsernameOk = classNames({
      'validate-form-info': className.isUsernameOk,
      'error-form-info': !className.isUsernameOk,
    });
    className.formFieldEmailOk = classNames({
      'validate-form-info': className.isEmailOk,
      'error-form-info': !className.isEmailOk,
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
}
