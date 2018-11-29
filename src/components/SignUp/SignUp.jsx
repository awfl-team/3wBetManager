import React from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../service/UserService';
import User from '../../model/User';

class SignUp extends React.Component {
  handleSubmit(event) {
    event.preventDefault();
    const user = new User(event.target.email.value,
      event.target.username.value,
      event.target.password.value);
    UserService.signUp(user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="register-page">
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui teal authentication-header">
              <div className="content">
                Créer un nouveau compte
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
                    <input type="password" name="password" placeholder="Mot de passe" />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon" />
                    <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" />
                  </div>
                </div>
                <button type="submit" className="ui fluid large teal submit button main-button">
Inscription
                </button>
              </div>

              <div className="ui error message" />

            </form>

            <div className="ui message">
              Vous avez déjà un compte ? &nbsp;
              <Link to="/login">Connexion</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
