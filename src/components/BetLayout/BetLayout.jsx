import React from 'react';
import {
  Button, Container, Grid, Icon,
} from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import User from '../../model/User';
import BetLayoutResult from './BetLayoutResult';
import BetSubmitLayout from './BetSubmitLayout';


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
            <Grid.Column floated="left" width={5}>
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
            <Grid.Column floated="right" width={5}>
              <div align="right">
                {this.props.history.location.pathname === '/bet/myBets' && (
                <Link to="/bet/submitBets" className="ui green icon right labeled button">
                    Let's do ma' bets boi
                  <Icon name="right arrow" />
                </Link>
                )}
                {this.props.history.location.pathname === '/bet/submitBets' && (
                <Link to="/bet/myBets" className="ui green icon right labeled button">
                      Let's see ma' bets boi
                  <Icon name="right arrow" />
                </Link>
                )}
              </div>
            </Grid.Column>
          </Grid>
        </Container>
        <Container fluid>
          <Route path="/bet/myBets" component={BetLayoutResult} />
          <Route path="/bet/submitBets" component={BetSubmitLayout} />
        </Container>
      </div>
    );
  }
}

export default BetLayout;
