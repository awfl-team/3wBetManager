import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';

class Login extends React.Component {
    state = {
      toDashboard: false,
      errorMessage: '',
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
        });
    }

    render() {
      const { toDashboard } = this.state;
      const { errorMessage } = this.state;

      if (toDashboard) {
        return <Redirect to="/dashboard" />;
      }
      return (
        <div className="login-page">
          <div className="ui middle aligned center aligned grid">
            <div className="column">
              <h2 className="ui teal authentication-header">
                <div className="content">
                                Connectez-vous
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
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                      />
                    </div>
                  </div>
                  <button type="submit" className="ui fluid large teal submit button main-button">Connexion</button>
                </div>
                {errorMessage != null
                && <div>{errorMessage}</div>
                }
              </form>

              <div className="ui message">
                            Nouveau ? &nbsp;
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
}


export default Login;
