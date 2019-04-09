import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserService from '../../service/UserService';
import User from '../../model/User';
import AuthService from '../../service/AuthService';
import VerifyService from '../../service/VerifyService';
import { addSnackBar } from '../../actions/SnackBarActions';
import FormUserService from '../../service/FormUserService';


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
    toDashboard: false,
    className: {},
  };

  handleChange = (property, event) => {
    const {
      email, username, password, confirmPassword,
    } = this.state;

    const refreshedClassName = FormUserService.refreshClassName(property,
      event.target.value, email, username, password, confirmPassword);
    const data = {
      className: refreshedClassName.className,
    };
    data[property] = refreshedClassName[property];
    this.setState(data);
  };

  handleSubmit(event) {
    event.preventDefault();
    const user = new User(event.target.email.value,
      event.target.username.value,
      event.target.password.value);
    // TODO change this
    user.Role = 'USER';
    if (event.target.password.value === event.target.confirmPassword.value) {
      UserService.signUp(user)
        .then(() => {
          UserService.login(user.Email, user.Password)
            .then((response) => {
              AuthService.setTokenInLocalStorage(response.data);
              this.setState({ toDashboard: true });
            });
        });
    }
  }

  render() {
    const {
      confirmPassword, password, toDashboard, email, username, className,
    } = this.state;

    if (toDashboard) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="register-page">
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <h2 className="ui teal authentication-header">
              <div className="content">
                  Create a new account
              </div>
            </h2>
            <form
              className="ui large form"
              onSubmit={this.handleSubmit.bind(this)}
              autoComplete="off"
            >
              <div className="ui stacked">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input
                      type="text"
                      name="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={e => this.handleChange('email', e)}
                      className={className.isEmailOk ? 'okInput' : `${email}` !== ''
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
                      onChange={e => this.handleChange('username', e)}
                      className={className.isUsernameOk ? 'okInput' : username.length === 0 ? '' : 'errorInput'}
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
                      onChange={e => this.handleChange('password', e)}
                      className={className.isPasswordOk ? 'okInput' : password.length === 0 ? '' : 'errorInput'}
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
                      onChange={e => this.handleChange('confirmPassword', e)}
                      className={className.isPasswordOk ? 'okInput' : confirmPassword.length === 0 ? '' : 'errorInput'}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="ui fluid large teal submit button main-button"
                  disabled={!className.isEnabled}
                >
                    Sign Up
                </button>
                <div className="form-info validation">
                  <p className={className.formFieldEmailOk}>
                    <i className="info circle icon" />
                      The email must respect the valid email
                      format
                  </p>
                  <p className={className.formFieldUsernameOk}>
                    <i className="info circle icon" />
                      The username requires at least 3 characters
                  </p>
                  <p className={className.formFieldIdentical}>
                    <i className="info circle icon" />
                      The password must be identical with the
                      password field
                  </p>
                  <p className={className.formFieldNumber}>
                    <i className="info circle icon" />
                      The password requires at least 12 characters
                  </p>
                  <p className={className.formMultipleInfos}>
                    <i className="info circle icon" />
                      The password requires a
                    <span
                      className={className.formdFieldUppercase}
                    >
                    uppercase
                    </span>
                      , a
                    <span className={className.formFieldSpecial}>
                        special character
                    </span>
                      and
                    <span
                      className={className.formFieldWithNumber}
                    >
                      a number
                    </span>
                  </p>
                </div>
              </div>
              <div className="ui error message" />
            </form>
            <div className="ui message">
                Already have an account ?
              {' '}
              <Link to="/login">Log In</Link>
              {' '}
              |
              {' '}
              <Link to="/forgot_password">Forgot password</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const SignUp = connect(null, mapDispatchToProps)(SignUpComponent);

export default SignUp;
