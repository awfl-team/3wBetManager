import * as React from 'react';
import AuthService from '../../service/AuthService';
import UserService from '../../service/UserService';
import User from '../../model/User';
import Error from '../Error/Error';

class UpdateProfile extends React.Component {
  state = {
    user: User,
    errorMessage: '',
  };

  componentDidMount() {
    const userInfo = AuthService.getUserInfo(AuthService.getToken());
    UserService.getByEmail(userInfo.email)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = new User(
      event.target.email.value,
      event.target.username.value,
      event.target.password.value,
    );
    user.Id = this.state.user.Id;
    if (event.target.password.value === event.target.confirmPassword.value) {
      UserService.updateUser(user).then((response) => {
      })
        .catch((error) => {
          this.setState({ errorMessage: error.response.data });
        });
    }
  }

  render() {
    const { user, errorMessage } = this.state;
    return (
      <div id="update-profile">
        <form className="ui large form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="ui stacked">
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon" />
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  defaultValue={user.Email}
                />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  defaultValue={user.Username}
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
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
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
          <Error errorMessage={errorMessage} />
        </form>
      </div>
    );
  }
}

export default UpdateProfile;
