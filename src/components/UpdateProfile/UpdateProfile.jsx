import * as React from 'react';
import {
  Button, Container, Header, Icon,
} from 'semantic-ui-react';
import User from '../../model/User';
import UserHttpService from '../../httpServices/UserHttpService';
import AuthHelper from '../../helpers/AuthHelper';
import FormClassnameHelper from '../../helpers/FormClassnameHelper';


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
    UserHttpService.getFromToken()
      .then((response) => {
        this.setState({ user: response.data });
        this.setState({ username: response.data.Username });
        this.setState({ email: response.data.Email });
      });
  }

  handleChange = (property, event) => {
    const {
      email, username, password, confirmPassword,
    } = this.state;

    const refreshedClassName = FormClassnameHelper.refreshClassName(property,
      event.target.value, email, username, password, confirmPassword);
    const data = {
      className: refreshedClassName.className,
    };
    data[property] = refreshedClassName[property];
    this.setState(data);
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
      UserHttpService.updateUser(user).then((response) => {
        AuthHelper.setTokenInLocalStorage(response.data);
        this.props.history.push('/profile');
      });
    }
  }

  render() {
    const {
      confirmPassword, password, user, email, username, className,
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
                    defaultValue={user.Username}
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
