import * as React from 'react';
import classNames from 'classnames/bind';
import {
  Button, Container, Header, Icon, Radio,
} from 'semantic-ui-react';
import User from '../../model/User';
import UserService from '../../service/UserService';
import VerifyService from '../../service/VerifyService';
import withAuthAdmin from '../AuthGuardAdmin/AuthGuardAdmin';
import {addSnackBar} from "../../actions/SnackBarActions";
import connect from "react-redux/es/connect/connect";

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class UserForm extends React.Component {
  state = {
    email: '',
    username: '',
    password: '',
    checked: false,
    confirmPassword: '',
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handleRoleChange = () => {
    this.setState({ checked: !this.state.checked });
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
      event.target.password.value,
    );
    if (this.state.checked === true) {
      user.Role = 'ADMIN';
    } else {
      user.Role = 'USER';
    }
    if (event.target.password.value === event.target.confirmPassword.value) {
      UserService.addUserAdmin(user).then(() => {
        this.props.addSnackbar({
          message: `${user.Username}'s account created`,
          type: 'success',
        });
      });
    }
  }

  render() {
    const {
      confirmPassword, password, email, username, checked,
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
      <div id="userForm">
        <Header as="h1" icon textAlign="center">
          <Icon name="user plus" circular />
          <Header.Content>Create a user</Header.Content>
        </Header>
        <Container textAlign="center" className="container-centered">
          <form className="ui form" onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
            <div className="ui stacked">
              <div className="field">
                <div className="ui left icon input">
                  <Icon name="mail" />
                  <input
                    type="text"
                    name="email"
                    placeholder="E-mail"
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
              <div className="field">
                <div className="ui left input">
                  <Radio
                    toggle
                    defaultChecked={checked}
                    onChange={this.handleRoleChange.bind(this)}
                  />
                  <p>&nbsp;&nbsp;Admin Role</p>
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
const AdminUserForm = connect(null, mapDispatchToProps)(UserForm);
export default withAuthAdmin(AdminUserForm);
