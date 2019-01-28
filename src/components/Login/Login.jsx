import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import VerifyService from '../../service/VerifyService';
import { addSnackBar } from '../../actions/SnackBarActions';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class LoginComponent extends React.Component {
  state = {
    toDashboard: false,
    email: '',
    password: '',
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();

    UserService.login(event.target.email.value, event.target.password.value)
      .then((response) => {
        AuthService.setTokenInLocalStorage(response);
        this.setState({ toDashboard: true });
      })
      .catch((error) => {
        this.props.addSnackbar({ message: error.response.data, type: 'danger' });
      });
  }

  render() {
    const {
      toDashboard, email, password,
    } = this.state;

    if (toDashboard) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="login-page">
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <h2 className="ui teal authentication-header">
              <div className="content">
                  Sign-in
              </div>
            </h2>
            <form className="ui large form" onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
              <div className="ui stacked">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleEmailChange.bind(this)}
                      className={VerifyService.isEmailOk(email) ? 'okInput' : `${email}` !== ''
                          && !VerifyService.isEmailOk(email) ? 'errorInput' : ''}
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
                      className={password.length !== 0 && password.length < 6
                        ? 'errorInput' : `${password.length}` > 6 ? 'okInput' : ''}
                    />
                  </div>
                </div>
                <button type="submit"
                        disabled={password.length === 0 || email.length === 0}
                        className="ui fluid large teal submit button main-button">Submit</button>
              </div>
            </form>


            <div className="ui message">
                New ? &nbsp;
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Login = connect(null, mapDispatchToProps)(LoginComponent);
export default Login;
