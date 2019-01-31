import React from 'react';
import {Button, Container, Header, Icon, Rating} from 'semantic-ui-react';
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
            <div className="profile-lives">
              <Rating icon='heart' defaultRating={3} maxRating={3} disabled size="massive" />
            </div>
            <div className="profile-coins">
              <Icon color='yellow' name='copyright' size="big" />
              <label>{user.Point}</label>
            </div>
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
          </Container>
        </div>
    );
  }
}

export default withAuth(ConsultProfile);
