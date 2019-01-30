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

class UserFormComponent extends React.Component {
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

    const isPasswordOk = VerifyService.isPasswordOk(password, confirmPassword);
    const isEmailOk = VerifyService.isEmailOk(email);
    const isUsernameOk = VerifyService.isUsernameOk(username);
    const isEnabled = (isPasswordOk && isEmailOk && isUsernameOk);

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
                  { !isEmailOk && email
                  && <p className="field-info">This field require a valid email</p>
                  }
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Nom d'utilisateur"
                      value={username}
                      onChange={this.handleUsernameChange.bind(this)}
                      className={isUsernameOk ? 'okInput' : `${username}` !== ''
                          && !isUsernameOk ? 'errorInput' : ''}
                    />
                  </div>
                  { !isUsernameOk && username
                  && <p className="field-info">This field require a least 6 characters</p>
                  }
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
                      className={password.length !== 0 && password.length < 6
                          || password !== confirmPassword ? 'errorInput' : `${password.length}` > 6
                          && password === confirmPassword ? 'okInput' : ''}
                    />
                  </div>
                  { !isPasswordOk && password
                    && <p className="field-info">This field require a least 6 characters and must be identical with the confirmation field</p>
                  }
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
                      className={confirmPassword.length !== 0 && confirmPassword.length < 6
                          || password !== confirmPassword ? 'errorInput' : `${confirmPassword.length}` > 6
                          && password === confirmPassword ? 'okInput' : ''}
                    />
                  </div>
                  { !isPasswordOk && confirmPassword
                    && <p className="field-info">This field require a least 6 characters and must be identical with the password field</p>
                  }
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

const UserForm = connect(null, mapDispatchToProps)(UserFormComponent);

export default UserForm;
