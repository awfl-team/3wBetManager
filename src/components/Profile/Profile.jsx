import React from 'react';
import { Button } from 'semantic-ui-react';
import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import User from '../../model/User';

class Profile extends React.Component {
  state = {
    user: User,
    errorMessage: '',
  };

  componentDidMount() {
    // TODO I think is better to use the store in this case
    const token = AuthService.getToken();
    const userInfo = AuthService.getUserInfo(token);
    UserService.getByEmail(userInfo.email)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((error) => {
        this.setState({ errorMessage: error.response.data });
      });
  }

  render() {
    const { user, errorMessage } = this.state;
    return (
      <div>
        {errorMessage != null
        && <div>{errorMessage}</div>
        }
        <h2>My Profile</h2>
        <ul>
          <li>{user.Email}</li>
          <li>{user.Username}</li>
          <li>{user.Point}</li>
        </ul>
        <Button color="red">Delete profile</Button>
        <Button color="yellow">Update profile</Button>
      </div>
    );
  }
}

export default Profile;
