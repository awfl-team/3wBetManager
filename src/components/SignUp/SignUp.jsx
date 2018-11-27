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
            <h2 className="ui teal image header">
              <img src="assets/images/logo.png" className="image" alt="" />
              <div className="content">
                Create a new account
              </div>
            </h2>
            <form className="ui large form" onSubmit={this.handleSubmit.bind(this)}>
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input type="text" name="email" placeholder="E-mail address" />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input type="text" name="username" placeholder="Username" />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon" />
                    <input type="password" name="password" placeholder="Password" />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon" />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" />
                  </div>
                </div>
                <button type="submit" className="ui fluid large teal submit button">
Singn Up
                </button>
              </div>

              <div className="ui error message" />

            </form>

            <div className="ui message">
              Already have an account ?
              <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
