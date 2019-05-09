import React, {FormEvent, SyntheticEvent} from 'react';
import {Link, Redirect, RouteComponentProps} from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import {AxiosResponse} from "axios";

interface LoginProps extends RouteComponentProps<any> {
}


class LoginComponent extends React.Component<LoginProps> {
  state = {
    toDashboard: false,
    email: '',
    password: '',
  };

  handleEmailChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    this.setState({ email: target.value })
  };

  handlePasswordChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    this.setState({ password: target.value });
  };

  handleSubmit(event: FormEvent) {
    event.preventDefault();

    const target = event.target as any;
    UserService.login(target.email.value, target.password.value)
      .then((response: AxiosResponse) => {
        AuthService.setTokenInLocalStorage(response.data);
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
