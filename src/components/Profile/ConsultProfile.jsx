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
  }

  render() {
    const {user} = this.state;
    console.log(user)
    return (
        <div id="profile">
          <Header as="h2" icon textAlign="center">
            <Icon name="user" circular/>
            <Header.Content>
              { user.Username }
              's profile and stats</Header.Content>
          </Header>
          <Container textAlign="center" className="container-centered">
            <div className="profile-lives">
              <Rating icon='heart' rating={user.Life} maxRating={3} disabled size="massive" />
            </div>
            <div className="profile-coins">
              <Icon color='yellow' name='copyright' size="big" />
              <label>{user.Point}</label>
            </div>
          </Container>
        </div>
    );
  }
}

export default ConsultProfile;
