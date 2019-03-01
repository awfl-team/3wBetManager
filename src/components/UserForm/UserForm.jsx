import * as React from 'react';
import classNames from 'classnames/bind';
import {
  Button, Container, Header, Icon, Radio,
} from 'semantic-ui-react';
import connect from 'react-redux/es/connect/connect';
import User from '../../model/User';
import UserService from '../../service/UserService';
import FormUserService from '../../service/FormUserService';
import withAuthAdmin from '../AuthGuardAdmin/AuthGuardAdmin';
import { addSnackBar } from '../../actions/SnackBarActions';

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
    className: {},
  };

  handleEmailChange = (event) => {
    const {
      email, username, password, confirmPassword,
    } = this.state;
    const refreshedClassName = FormUserService.refreshClassName('mail', event.target.value, email, username, password, confirmPassword);
    this.setState({ className: refreshedClassName.className, email: refreshedClassName.email });
  };

  handleUsernameChange = (event) => {
    const {
      email, username, password, confirmPassword,
    } = this.state;
    const refreshedClassName = FormUserService.refreshClassName('username', event.target.value, email, username, password, confirmPassword);
    this.setState({ className: refreshedClassName.className, username: refreshedClassName.username });
  };

  handlePasswordChange = (event) => {
    const {
      email, username, password, confirmPassword,
    } = this.state;
    const refreshedClassName = FormUserService.refreshClassName('password', event.target.value, email, username, password, confirmPassword);
    this.setState({ className: refreshedClassName.className, password: refreshedClassName.password });
  };

  handlePasswordConfirmationChange = (event) => {
    const {
      email, username, password, confirmPassword,
    } = this.state;
    const refreshedClassName = FormUserService.refreshClassName('confirmPassword', event.target.value, email, username, password, confirmPassword);
    this.setState({
      className: refreshedClassName.className,
      confirmPassword: refreshedClassName.confirmPassword,
    });
  };

  handleRoleChange = () => {
    this.setState({ checked: !this.state.checked });
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
      confirmPassword, password, email, username, checked, className,
    } = this.state;

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
const AdminUserForm = connect(null, mapDispatchToProps)(UserForm);
export default withAuthAdmin(AdminUserForm);
