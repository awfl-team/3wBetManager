import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import UserService from '../../services/UserService';
import AuthHelper from '../../helpers/AuthHelper';

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
        AuthHelper.setTokenInLocalStorage(response.data);
        this.setState({ toDashboard: true });
      });
  }

  handleClick() {
    this.props.history.push('/');
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
        <Button color="red" size="huge" id="returnHome" circular icon onClick={() => this.handleClick()}>
          <Icon name="home" />
        </Button>
        <div className="ui middle aligned center aligned fullpage">
          <div className="column">
            <h2 className="ui teal authentication-header">
                Sign in
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
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="ui fluid large teal submit button main-button"
                >
                Submit
                </button>
              </div>
            </form>


            <div className="ui message">
              New ?
              {' '}
              <Link to="/signup">Sign Up</Link>
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

export default LoginComponent;
