import React from 'react';
import {
  Container, Grid, Icon,
} from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import BetLayoutResult from '../BetResult/BetLayoutResult';
import BetSubmitLayout from '../BetSubmit/BetSubmitLayout';
import withAuth from '../AuthGuard/AuthGuard';


class BetLayout extends React.Component {
  render() {
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
