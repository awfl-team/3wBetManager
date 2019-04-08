import React from 'react';
import {
  Container, Menu,
} from 'semantic-ui-react';
import { NavLink, Route } from 'react-router-dom';
import BetLayoutResult from '../BetResult/BetLayoutResult';
import BetSubmitLayout from '../BetSubmit/BetSubmitLayout';
import withAuth from '../AuthGuard/AuthGuard';


class BetLayout extends React.Component {
  state = { activeItem: 'manageUsers' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div id="betLayout">
        <Container fluid>
          <div id="inlineMenu">
            <Menu>
              <Menu.Item
                as={NavLink}
                name="results"
                onClick={this.handleItemClick}
                active={activeItem === 'results'}
                to="/bet/myBets"
              >
                My results
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                name="manageBets"
                onClick={this.handleItemClick}
                active={activeItem === 'manageBets'}
                to="/bet/submitBets"
              >
                Manage my bets
              </Menu.Item>
            </Menu>
          </div>
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
