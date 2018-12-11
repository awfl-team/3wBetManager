import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';

class Login extends React.Component {
    state = {
      toDashboard: false,
      email: '',
      password: '',
      errorMessage: null,
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
          this.setState({ errorMessage: error.response.data });
            document.getElementById('messageContainer').classList = 'errorMessage show';
            setTimeout(() => {
                document.getElementById('messageContainer').classList = 'errorMessage hide';
            }, 3000);
        });
    }

    render() {
      const { toDashboard, errorMessage, email, password} = this.state;
      const isEmailOk = (/^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_]+\.[A-Za-z]+$/.test(email));
      const isPasswordOk = (password.length > 6);
      const isEnabled = (isEmailOk && isPasswordOk);

      if (toDashboard) {
        return <Redirect to="/dashboard" />;
      }
      return (
        <div className="login-page">
          <div className="ui middle aligned center aligned fullpage">
            <div className="column">
              <h2 className="ui teal authentication-header">
                <div className="content">
                               Sign In
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
                        value={email} onChange={this.handleEmailChange.bind(this)} className={isEmailOk ? 'okInput': '' + email !== '' && !isEmailOk ? 'errorInput': ''}
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
                        className={password.length !== 0 && password.length < 6 ? 'errorInput':'' + password.length > 6 ? 'okInput':''}

                      />
                    </div>
                  </div>
                  {isEnabled &&
                    <button type="submit" className="ui fluid large teal submit button main-button">Connection</button>
                  }
                </div>
                 <div className={errorMessage ? 'errorMessage show': 'errorMessage'} id={'messageContainer'}>{errorMessage != null
                && {errorMessage}
                }
                </div>
              </form>

              <div className="ui message">
                            New on 3wBetManager ? &nbsp;
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
}


export default Login;
