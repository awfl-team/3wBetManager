import React from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import {
  Container, Icon, Menu, Segment, Sidebar,
} from 'semantic-ui-react';
import Dashboard from '../Dashboard/Dashboard';
import AuthService from '../../service/AuthService';
import Profile from '../Profile/Profile';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import withAuth from '../AuthGuard/AuthGuard';
import BetLayout from '../BetLayout/BetLayout';
import BestBettersLayout from '../BestBetters/BestBettersLayout';

class UserLayout extends React.Component {
  state = {
    visible: true,
    toHome: false,
  };

  handleToggleSidenav = () => this.setState(previousState => ({ visible: !previousState.visible }));

  logout() {
    AuthService.logout();
    this.props.history.push('/login');
    this.setState({ toHome: true });
  }

  render() {
    const {
      visible, toHome,
    } = this.state;
    const { user } = this.props;

    if (toHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="layout">
        <Menu inverted>
          <Menu.Item as="a" className="menu-hamburger" onClick={() => this.handleToggleSidenav()}><Icon name="sidebar" /></Menu.Item>
          <Container className="navbar">
            <Menu.Item className="user-info">
              {user.unique_name.toString()}
            </Menu.Item>
            <Menu.Item as={NavLink} to="/profile">
              My profile
            </Menu.Item>
            <Menu.Item as="a" onClick={() => this.logout()}>
              Logout
            </Menu.Item>
          </Container>
        </Menu>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="push" visible={visible} icon="labeled" inverted vertical width="thin">
            <Menu.Item as={NavLink} activeClassName="active" to="/dashboard">
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as={NavLink} activeClassName="active" to="/mybets">
              <Icon name="ticket" />
              My Bets
            </Menu.Item>
            <Menu.Item as={NavLink} activeClassName="active" to="/bestBetters">
              <Icon name="star" />
              Best betters
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="camera" />
              Channels
            </Menu.Item>
          </Sidebar>
          <div />
          <Sidebar.Pusher className={!visible ? 'full-width' : ''}>
            <Segment basic className="content-container">
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/profile" component={Profile} />
              <Route path="/update-profile" component={UpdateProfile} />
              <Route path="/mybets" component={BetLayout} />
              <Route path="/bestBetters" component={BestBettersLayout} />
              <Route path="/users/:userId" component={Profile} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default withAuth(UserLayout);
