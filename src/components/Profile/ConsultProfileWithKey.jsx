import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import User from '../../model/User';
import UserHttpService from '../../httpServices/UserHttpService';
import ConsultProfileStats from '../Stats/ConsultProfileStats';
import BetsWithKey from './BetsWithKey';

class ConsultProfileWithKey extends React.Component {
  state = {
    user: User,
    userLives: '',
  };

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      UserHttpService.getUserById(this.props.location.state.userId)
        .then((response) => {
          this.setState({ user: response.data, userLives: response.data.Items.filter(i => i.Type === 'LIFE').length });
        })
        .catch(() => {
          this.props.history.push('/404');
        });
    } else {
      this.props.history.push('/404');
    }
  }

  render() {
    const { user, userLives } = this.state;
    return (
      <div id="consultWithKey">
        <Header as="h1" icon textAlign="center">
          <Icon name="user" circular />
          <Header.Content>
            {user.Username}
            's profile and stats
          </Header.Content>
        </Header>
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
          {this.props.location.state !== undefined
            && (
            <div>
              <ConsultProfileStats userId={this.props.location.state.userId} />
              <BetsWithKey userId={this.props.location.state.userId} />
            </div>
            )
            }
        </Container>
      </div>
    );
  }
}

export default ConsultProfileWithKey;
