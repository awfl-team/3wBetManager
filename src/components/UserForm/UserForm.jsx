import * as React from 'react';
import {
  Button, Container, Header, Icon, Radio,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
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

  handleChange = (property, event) => {
    const {
      email, username, password, confirmPassword,
    } = this.state;

    const refreshedClassName = FormUserService.refreshClassName(property,
      event.target.value, email, username, password, confirmPassword);
    const data = {
      className: refreshedClassName.className,
    };
    data[property] = refreshedClassName[property];
    this.setState(data);
  };

  handleRoleChange = () => {
    const { checked } = this.state;
    this.setState({ checked });
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
                    onChange={e => this.handleChange('email', e)}
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
                    onChange={e => this.handleChange('username', e)}
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
                    onChange={e => this.handleChange('password', e)}
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
                    onChange={e => this.handleChange('confirmPassword', e)}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left input">
                  <Radio
                    toggle
                    defaultChecked={checked}
                    onChange={() => this.handleRoleChange}
                  />
                  <p>
                    {' '}
                    Admin Role
                  </p>
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
                <span className={className.formdFieldUppercase}>
                  uppercase
                </span>
                , a
                <span className={className.formFieldSpecial}>
                  {' '}
                  special character
                </span>
                {' '}
                and
                <span className={className.formFieldWithNumber}>
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
