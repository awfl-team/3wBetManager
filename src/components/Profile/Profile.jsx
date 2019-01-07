import React from 'react';
import {
  Button, Container, Divider, Header, Icon,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
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
      <div id="profile">
        <Header as="h2" icon textAlign="center">
          <Icon name="user" circular />
          <Header.Content>My profile</Header.Content>
        </Header>
        <Container textAlign="center" className="container-centered">
          <Button
            content="Email"
            icon="mail"
            fluid
            label={{
              basic: true, pointing: 'left', content: user.Email,
            }}
          />
          <Button
            content="Username"
            icon="user"
            fluid
            label={{
              basic: true, pointing: 'left', content: user.Username,
            }}
          />
          <Button
            color="blue"
            content="Score"
            icon="winner"
            fluid
            label={{
              basic: true, color: 'blue', pointing: 'left', content: `${user.Point} pts`,
            }}
          />


          <Container className="container-actions">
            <Button circular icon="trash" color="red" size="huge" />
            <Button as={NavLink} to="/update-profile" circular color="orange" size="huge">
              <Icon name='pencil' />
            </Button>
          </Container>
        </Container>

        <Divider section />

        <Header as="h2" icon textAlign="center">
          <Icon name="pie graph" circular />
          <Header.Content>Stats</Header.Content>
        </Header>

        {errorMessage != null
        && <div>{errorMessage}</div>
        }

      </div>
    );
  }
}

export default Profile;
