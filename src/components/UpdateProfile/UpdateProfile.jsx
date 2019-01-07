import * as React from 'react';
import AuthService from '../../service/AuthService';
import UserService from '../../service/UserService';
import User from '../../model/User';
import Error from '../Error/Error';

import {Header, Button, Container, Icon} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

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
      <div id="profile">
        <Header as="h2" icon textAlign="center">
          <Icon name="cogs" circular />
          <Header.Content>Update my profile</Header.Content>
        </Header>
        <Container textAlign="center" className="container-centered">
          <form className="ui large form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="ui stacked">
            <div className="field">
              <div className="ui left icon input">
                <Icon name="mail" />
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
                <Icon name="user" />
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
                <Icon name="lock" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <Icon name="lock" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </div>
          <Error errorMessage={errorMessage} />
            <Container className="container-actions">
              <Button type="submit" circular color="green" size="huge">Submit </Button>
            </Container>
          </form>
        </Container>
      </div>
    );
  }
}

export default UpdateProfile;
