import React from 'react';
import {Button, Container, Grid, Header, Icon} from 'semantic-ui-react';
import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import User from '../../model/User';
import BetCup from './BetCup';



class BetLayout extends React.Component {
  state = {
    user: User,
  };

  componentDidMount() {
    // TODO I think is better to use the store in this case
    const token = AuthService.getToken();
    const userInfo = AuthService.getUserInfo(token);
    UserService.getByEmail(userInfo.email)
      .then((response) => {
        this.setState({ user: response.data });
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div id="betLayout">
        <Container fluid>
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Button
                color="blue"
                content="Score"
                icon="winner"
                fluid
                label={{
                  basic: true, color: 'blue', pointing: 'left', content: `${user.Point} pts`,
                }}
              />
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <div align="right">
                <Button icon labelPosition='right' color="green">
                  Let's do ma' bets boi
                  <Icon name='right arrow' />
                </Button>
              </div>
            </Grid.Column>
          </Grid>
        </Container>
        <Container fluid>
          <BetCup/>
        </Container>
      </div>
      );
  }
}

export default BetLayout;
