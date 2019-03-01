import React from 'react';
import {
  Container, Header, Icon, Rating,
} from 'semantic-ui-react';
import User from '../../model/User';
import UserService from '../../service/UserService';
import ConsultProfileStats from '../Stats/ConsultProfileStats';

class ConsultProfile extends React.Component {
  state = {
    user: User,
  };

  // @todo Refactor stats of consultProfile and profile as a component
  // @todo Must have a user given. Consult profile must have a user. Profile must have current user.

  componentDidMount() {
    UserService.getUserById(this.props.match.params.userId)
      .then(response => this.setState({ user: response.data }))
      .catch(() => {
        this.props.history.push('/404');
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div id="profile">
        {user.IsPrivate === false
            && (
            <Header as="h1" icon textAlign="center">
              <Icon name="user" circular />
              <Header.Content>
                {user.Username}
                's profile and stats
              </Header.Content>
            </Header>
            )
          }
        { user.IsPrivate === true
          && (
          <Header as="h1" icon textAlign="center">
            <Icon name="eye slash" circular />
            <Header.Content>
              { user.Username }
              's profile is private
            </Header.Content>
          </Header>
          )}
        <Container textAlign="center" className="container-centered">
          {user.IsPrivate === false
          && (
          <div>
            <div className="profile-lives">
              <Rating icon="heart" rating={user.Life} maxRating={3} disabled size="massive" />
            </div>
            <div className="profile-coins">
              <Icon color="yellow" name="copyright" size="big" />
              <label>{user.Point}</label>
            </div>
          </div>
          )
          }
          <ConsultProfileStats user={user} />
          { user.IsPrivate === true
            && <h2>You are only able to see his lives, coins and username</h2>
          }
        </Container>
      </div>
    );
  }
}

export default ConsultProfile;
