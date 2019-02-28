import * as React from 'react';
import classNames from 'classnames/bind';
import {
  Button, Container, Header, Icon,
} from 'semantic-ui-react';
import User from '../../model/User';
import UserService from '../../service/UserService';
import VerifyService from '../../service/VerifyService';
import AuthService from '../../service/AuthService';
import FormUserService from '../../service/FormUserService';


class UpdateProfile extends React.Component {
  state = {
    user: User,
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    className: {},
  };

  componentDidMount() {
    UserService.getFromToken()
      .then((response) => {
        this.setState({ user: response.data });
        this.setState({ username: response.data.Username });
        this.setState({ email: response.data.Email });
        this.initClassName();
      })
      .catch((error) => {
        this.setState({ message: error.response.data });
      });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
    this.initClassName();
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
    this.initClassName();
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
    this.initClassName();
  };

  handlePasswordConfirmationChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
    this.initClassName();
  };

  initClassName() {
    const classnames = FormUserService.getClassNames(
      this.state.email,
      this.state.username,
      this.state.password,
      this.state.confirmPassword,
    );
    this.setState({ className: classnames });
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
        AuthService.setTokenInLocalStorage(response);
        this.props.history.push('/profile');
      });
    }
  }

  render() {
    const {
      confirmPassword, password, user, email, username, className
    } = this.state;

    return (
      <div id="profile">
        <Header as="h2" icon textAlign="center">
          <Icon name="cogs" circular />
          <Header.Content>Update my profile</Header.Content>
        </Header>
        <Container textAlign="center" className="container-centered">
          <form className="ui large form" onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
            <div className="ui stacked">
              <div className="field">
                <div className="ui left icon input">
                  <Icon name="mail" />
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    defaultValue={user.Email}
                    value={email}
                    onChange={this.handleEmailChange.bind(this)}
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
                    value={username}
                    onChange={this.handleUsernameChange.bind(this)}
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
                    value={password}
                    onChange={this.handlePasswordChange.bind(this)}
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
                    value={confirmPassword}
                    onChange={this.handlePasswordConfirmationChange.bind(this)}
                  />
                </div>
              </div>
            </div>
            <div className="form-info validation">
              <p className={className.formFieldEmailOk}>
                <i className="info circle icon" />
                {' '}
The email must respect a valid email format
              </p>
              <p className={className.formFieldUsernameOk}>
                <i className="info circle icon" />
                {' '}
The username requires at least 3 characters
              </p>
              <p className={className.formFieldIdentical}>
                <i className="info circle icon" />
                {' '}
The password must be identical with the
                password field
              </p>
              <p className={className.formFieldNumber}>
                <i className="info circle icon" />
                {' '}
The password requires at least 12 characters
              </p>
              <p className={className.formMultipleInfos}>
                <i className="info circle icon" />
                {' '}
The password requires a
                <span
                  className={className.formdFieldUppercase}
                >
                    uppercase
                </span>
, a
                <span
                  className={className.formFieldSpecial}
                >
                  {' '}
special character
                </span>
                {' '}
and
                <span
                  className={className.formFieldWithNumber}
                >
a number
                </span>
              </p>
            </div>
            <Container className="container-actions">
              <Button type="submit" circular color="green" size="huge" disabled={!className.isEnabled}>Submit </Button>
            </Container>
          </form>
        </Container>
      </div>
    );
  }
}

export default UpdateProfile;
