import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../service/UserService';
import User from '../../model/User';


class SignUp extends React.Component {
    state = {
      password: '',
      confirmPassword: '',
      errorMessage: null,
    };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handlePasswordConfirmationChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = new User(event.target.email.value,
      event.target.username.value,
      event.target.password.value);
    if (event.target.password.value !== event.target.confirmPassword.value) {
    } else {
      UserService.signUp(user)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.setState({ errorMessage: error.response.data });
        });
    }
  }

  render() {
    const { confirmPassword, password, errorMessage } = this.state;
    const isEnabled = (password !== confirmPassword || password === '' || confirmPassword === '');
    return (
      <div className="register-page">
        <div className="ui middle aligned center aligned grid">
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
                    <input type="text" name="email" placeholder="E-mail" />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input type="text" name="username" placeholder="Nom d'utilisateur" />
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
                    />
                  </div>
                </div>
                <button disabled={isEnabled} type="submit" className="ui fluid large teal submit button main-button">
                    Sign Up
                </button>
              </div>

              <div className="ui error message" />

            </form>

            <div className="ui message">
                Already have an account ? &nbsp;
              <Link to="/login">Log In</Link>

            </div>
            {errorMessage != null
             && <div>{errorMessage}</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
