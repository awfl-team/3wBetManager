import React from 'react';
import {
  Button, Container, Grid, Icon,
} from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import UserService from '../../service/UserService';
import User from '../../model/User';
import BetLayoutResult from './BetLayoutResult';
import BetSubmitLayout from './BetSubmitLayout';
import withAuth from '../AuthGuard/AuthGuard';


class BetLayout extends React.Component {
  state = {
    user: User,
  };

  componentDidMount() {
    UserService.getFromToken()
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
            <Grid.Column floated="right" width={5}>
              <div align="right">
                {this.props.history.location.pathname === '/bet/myBets' && (
                <Link to="/bet/submitBets" className="ui green icon right labeled button">
                    Manage my bets
                  <Icon name="right arrow" />
                </Link>
                )}
                {this.props.history.location.pathname === '/bet/submitBets' && (
                <Link to="/bet/myBets" className="ui green icon right labeled button">
                      My results
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

export default withAuth(BetLayout);
