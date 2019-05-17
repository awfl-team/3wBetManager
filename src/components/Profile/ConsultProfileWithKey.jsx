import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';
import User from '../../model/User';
import UserService from '../../service/UserService';
import ConsultProfileStats from '../Stats/ConsultProfileStats';
import BetsWithKey from './BetsWithKey';
import ProfilSkeleton from '../SkeletonLoaders/ProfilSkeleton';

class ConsultProfileWithKey extends React.Component {
  state = {
    user: User,
    userLives: '',
    isLoading: true,
  };

  componentDidMount() {
    if (this.props.location.state !== undefined) {
      UserService.getUserById(this.props.location.state.userId)
        .then((response) => {
          this.setState({
            user: response.data,
            userLives: response.data.Items.filter(i => i.Type === 'LIFE').length,
            isLoading: false,
          });
        })
        .catch(() => {
          this.props.history.push('/404');
        });
    } else {
      this.props.history.push('/404');
    }
  }

  render() {
    const { user, userLives, isLoading } = this.state;
    return (
      <div id="consultWithKey">
        { isLoading ? (
          <ProfilSkeleton />
        ) : (
          <div>
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
            </Container>
          </div>
        )
        }
        {this.props.location.state !== undefined
        && (
          <div>
            <ConsultProfileStats userId={this.props.location.state.userId} />
            <BetsWithKey userId={this.props.location.state.userId} />
          </div>
        )
        }
      </div>
    );
  }
}

export default ConsultProfileWithKey;
