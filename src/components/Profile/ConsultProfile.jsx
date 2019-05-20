import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import User from '../../model/User';
import UserService from '../../services/UserService';
import ConsultProfileStats from '../Stats/ConsultProfileStats';

class ConsultProfile extends React.Component {
  state = {
    user: User,
    userLives: '',
  };

  componentDidMount() {
    UserService.getUserById(this.props.match.params.userId)
      .then((response) => {
        this.setState({
          user: response.data,
          userLives: response.data.Items.filter(i => i.Type === 'LIFE').length,
        });
      })
      .catch(() => {
        this.props.history.push('/404');
      });
  }

  render() {
    const { user, userLives } = this.state;
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
        {user.IsPrivate === true
          && (
          <Header as="h1" icon textAlign="center">
            <Icon name="eye slash" circular className="whiteColor" />
            <Header.Content>
              {user.Username}
                  's profile is private
            </Header.Content>
          </Header>
          )}
        <Container textAlign="center" className="container-centered">
          <div className="profile-lives">
            <div>
              <Icon color="red" name="heart" size="big" />
              <span>{userLives}</span>
            </div>
          </div>
          <div className="profile-coins">
            <Icon color="yellow" name="copyright" size="big" />
            <span>{user.Point}</span>
          </div>
          {user.IsPrivate === false
            && (
            <ConsultProfileStats userId={this.props.match.params.userId} />
            )
            }
          {user.IsPrivate === true
            && <h2>You are only able to see his lives, coins and username</h2>
            }
        </Container>
      </div>
    );
  }
}

export default ConsultProfile;
