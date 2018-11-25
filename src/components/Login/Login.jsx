import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserService from '../../service/UserService';
import Dashboard from '../Dashboard/Dashboard';

class Login extends React.Component {
    state = {
      toDashboard: false,
    };

    handleSubmit(event) {
      event.preventDefault();
      UserService.login(event.target.email.value, event.target.password.value)
        .then(() => {
          this.setState({ toDashboard: true });
        })
        .catch((error) => {
          // display error message
        });
    }

    render() {
      const { toDashboard } = this.state;

      if (toDashboard) {
        return <Redirect to="/dashboard" component={Dashboard} />;
      }
      return (
        <div className="login-page">
          <div className="ui middle aligned center aligned grid">
            <div className="column">
              <h2 className="ui teal image header">
                <img src="assets/images/logo.png" className="image" />
                <div className="content">
                                Log-in to your account
                </div>
              </h2>
              <form className="ui large form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="ui stacked segment">
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon" />
                      <input
                        type="text"
                        name="email"
                        placeholder="E-mail address"
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
                      />
                    </div>
                  </div>
                  <button type="submit" className="ui fluid large teal submit button">Login</button>
                </div>

                <div className="ui error message" />

              </form>

              <div className="ui message">
                            New to us?
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
}


export default Login;
