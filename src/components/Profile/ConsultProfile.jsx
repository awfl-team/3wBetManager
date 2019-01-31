import React from 'react';
import {Button, Container, Header, Icon} from 'semantic-ui-react';
import User from '../../model/User';
import UserService from '../../service/UserService';
import API from '../../api';
import withAuth from '../AuthGuard/AuthGuard';

class ConsultProfile extends React.Component {
  state = {
    user: User,
  };

  componentDidMount() {
    UserService.getUserById(this.props.match.params.userId)
        .then((response) => this.setState({ user: response.data }));
    console.log(this.state.user);
  }

  render() {
    const {user} = this.state;
    return (
        <div id="profile">
          <Header as="h2" icon textAlign="center">
            <Icon name="user" circular/>
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
          </Container>
        </div>
    );
  }
}

export default withAuth(ConsultProfile);
