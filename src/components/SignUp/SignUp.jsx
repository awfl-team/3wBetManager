import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserService from '../../service/UserService';
import User from '../../model/User';
import AuthService from '../../service/AuthService';
import VerifyService from '../../service/VerifyService';
import { addSnackBar } from '../../actions/SnackBarActions';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class SignUpComponent extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    message: '',
    toDashboard: false,
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handlePasswordConfirmationChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    const user = new User(event.target.email.value,
      event.target.username.value,
      event.target.password.value);
    if (event.target.password.value === event.target.confirmPassword.value) {
      UserService.signUp(user)
        .then(() => {
          UserService.login(user.Email, user.Password)
            .then((response) => {
              AuthService.setTokenInLocalStorage(response);
              this.setState({ toDashboard: true });
            });
        }).catch((error) => {
          this.props.addSnackbar({ message: error.response.data, type: 'danger' });
        });
    }
  }

  render() {
    const {
      confirmPassword, password, message, toDashboard, email, username,
    } = this.state;

    if (toDashboard) {
      return <Redirect to="/dashboard" />;
    }

    const isEmailOk = VerifyService.isEmailOk(email);
    const isUsernameOk = VerifyService.isUsernameOk(username);
    const isPasswordIdentical = VerifyService.isPasswordIdentical(password, confirmPassword);
    const isPasswordNumberCharOk = VerifyService.isPasswordNumberChars(password);
    const isPasswordSpecialChar = VerifyService.isPasswordSpecialChar(password);
    const isPasswordUppercase = VerifyService.isPasswordUppercase(password);
    const isPasswordWithNumber = VerifyService.isPasswordWithNumber(password);
    const isPasswordOk = (isPasswordNumberCharOk && isPasswordWithNumber && isPasswordSpecialChar && isPasswordUppercase && isPasswordIdentical);
    const isEnabled = (isEmailOk && isUsernameOk && isPasswordNumberCharOk && isPasswordWithNumber && isPasswordSpecialChar && isPasswordUppercase && isPasswordIdentical);

    return (
      <div className="register-page">
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <h2 className="ui teal authentication-header">
              <div className="content">
                  Create a new account
              </div>
            </h2>
            <form className="ui large form" onSubmit={this.handleSubmit.bind(this)}>
              <div className="ui stacked">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input
                      type="text"
                      name="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={this.handleEmailChange.bind(this)}
                      className={isEmailOk ? 'okInput' : `${email}` !== ''
                          && !VerifyService.isEmailOk(email) ? 'errorInput' : ''}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={this.handleUsernameChange.bind(this)}
                      className={isUsernameOk ? 'okInput' : username.length === 0 ? '' : 'errorInput'}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon" />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.handlePasswordChange.bind(this)}
                      className={isPasswordOk ? 'okInput' : password.length === 0 ? '' : 'errorInput'}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={this.handlePasswordConfirmationChange.bind(this)}
                      className={isPasswordOk ? 'okInput' : confirmPassword.length === 0 ? '' : 'errorInput'}
                    />
                  </div>
                </div>
                <div className={password === "" || isPasswordOk ? 'form-info-hidden' : 'form-info'}>
                  <h2 class="form-info-title"> Don't forget to :</h2>
                  <p className={isPasswordIdentical ? 'validate-form-info' : 'error-form-info'}>
                    <i className="info circle icon"/> The password must be identical with the password field</p>
                  <p className={isPasswordNumberCharOk ? 'validate-form-info' : 'error-form-info'}>
                    <i className="info circle icon"/> The password requires at least 12 characters</p>
                  <p className={isPasswordUppercase && isPasswordSpecialChar && isPasswordWithNumber  ? 'validate-form-info' : 'error-form-info'}>
                    <i className="info circle icon"/> The password requires a <span
                      className={isPasswordUppercase ? 'validate-form-info' : 'error-form-info'}>uppercase</span>, a <span
                      className={isPasswordSpecialChar ? 'validate-form-info' : 'error-form-info'}> special character</span> and <span
                      className={isPasswordWithNumber ? 'validate-form-info' : 'error-form-info'}>a number</span></p>
                </div>
                <button
                  type="submit"
                  className="ui fluid large teal submit button main-button"
                  disabled={!isEnabled}
                >
                        Sign Up
                </button>

              </div>
              <div className="ui error message" />
            </form>
            <div className="ui message">
                Already have an account ? &nbsp;
              <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SignUp = connect(null, mapDispatchToProps)(SignUpComponent);

export default SignUp;
