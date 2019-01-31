import * as React from 'react';
import classNames from 'classnames/bind';
import {
  Button, Container, Header, Icon,
} from 'semantic-ui-react';
import User from '../../model/User';
import UserService from '../../service/UserService';
import VerifyService from '../../service/VerifyService';
import AuthService from '../../service/AuthService';
import withAuth from '../AuthGuard/AuthGuard';


class UpdateProfile extends React.Component {
  state = {
    user: User,
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  componentDidMount() {
    UserService.getFromToken()
      .then((response) => {
        this.setState({ user: response.data });
        this.setState({ username: response.data.Username });
        this.setState({ email: response.data.Email });
      })
      .catch((error) => {
        this.setState({ message: error.response.data });
      });
  }


  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handlePasswordConfirmationChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  };

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
      confirmPassword, password, user, email, username,
    } = this.state;
    const isEmailOk = VerifyService.isEmailOk(email);
    const isUsernameOk = VerifyService.isUsernameOk(username);
    const isPasswordIdentical = VerifyService.isPasswordIdentical(password, confirmPassword);
    const isPasswordNumberCharOk = VerifyService.isPasswordNumberChars(password);
    const isPasswordSpecialChar = VerifyService.isPasswordSpecialChar(password);
    const isPasswordUppercase = VerifyService.isPasswordUppercase(password);
    const isPasswordWithNumber = VerifyService.isPasswordWithNumber(password);
    const isEnabled = (isEmailOk && isUsernameOk && isPasswordNumberCharOk && isPasswordWithNumber
        && isPasswordSpecialChar && isPasswordUppercase && isPasswordIdentical);

    const formFieldUsernameOk = classNames({
      'validate-form-info': isUsernameOk,
      'error-form-info': !isUsernameOk,
    });
    const formFieldEmailOk = classNames({
      'validate-form-info': isEmailOk,
      'error-form-info': !isEmailOk,
    });
    const formFieldIdentical = classNames({
      'validate-form-info': isPasswordIdentical,
      'error-form-info': !isPasswordIdentical,
    });
    const formFieldNumber = classNames({
      'validate-form-info': isPasswordNumberCharOk,
      'error-form-info': !isPasswordNumberCharOk,
    });
    const formdFieldUppercase = classNames({
      'validate-form-info': isPasswordUppercase,
      'error-form-info': !isPasswordUppercase,
    });
    const formFieldSpecial = classNames({
      'validate-form-info': isPasswordSpecialChar,
      'error-form-info': !isPasswordSpecialChar,
    });
    const formFieldWithNumber = classNames({
      'validate-form-info': isPasswordWithNumber,
      'error-form-info': !isPasswordWithNumber,
    });
    const formMultipleInfos = classNames({
      'validate-form-info': isPasswordUppercase && isPasswordSpecialChar
              && isPasswordWithNumber,
      'error-form-info': !isPasswordUppercase
              || !isPasswordSpecialChar || !isPasswordWithNumber,
    });

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
              <p className={formFieldEmailOk}>
                <i className="info circle icon" />
                {' '}
The email must respect a valid email format
              </p>
              <p className={formFieldUsernameOk}>
                <i className="info circle icon" />
                {' '}
The username requires at least 3 characters
              </p>
              <p className={formFieldIdentical}>
                <i className="info circle icon" />
                {' '}
The password must be identical with the
                password field
              </p>
              <p className={formFieldNumber}>
                <i className="info circle icon" />
                {' '}
The password requires at least 12 characters
              </p>
              <p className={formMultipleInfos}>
                <i className="info circle icon" />
                {' '}
The password requires a
                <span
                  className={formdFieldUppercase}
                >
                    uppercase
                </span>
, a
                <span
                  className={formFieldSpecial}
                >
                  {' '}
special character
                </span>
                {' '}
and
                <span
                  className={formFieldWithNumber}
                >
a number
                </span>
              </p>
            </div>
            <Container className="container-actions">
              <Button type="submit" circular color="green" size="huge" disabled={!isEnabled}>Submit </Button>
            </Container>
          </form>
        </Container>
      </div>
    );
  }
}

export default withAuth(UpdateProfile);
