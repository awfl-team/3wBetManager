import React from 'react';
import {NavLink, Redirect, Route} from 'react-router-dom';
import {Container, Icon, Menu, Segment, Sidebar,} from 'semantic-ui-react';
import Dashboard from '../Dashboard/Dashboard';
import AuthService from '../../service/AuthService';
import Profile from '../Profile/Profile';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import BetLayout from "../BetLayout/BetLayout";
import BetSubmitLayout from "../BetLayout/BetSubmitLayout";

class UserLayout extends React.Component {
  state = {
    visible: true,
    username: Object,
    userPoints: Object,
    toHome: false,
    toLogin: false,
  };

  componentDidMount() {
    const token = AuthService.getToken();
    const userInfo = AuthService.getUserInfo(token);
    this.setState({ username: userInfo.unique_name });
    this.setState({ userPoints: userInfo.points });
  }

  handleToggleSidenav = () => this.setState(previousState => ({ visible: !previousState.visible }));

  logout() {
    AuthService.logout();
    this.setState({ toHome: true });
  }

  render() {
    const {
      visible, username, toHome, toLogin, userPoints
    } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }
    if (toLogin) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="layout">
        <Menu inverted>
          <Menu.Item as="a" className="menu-hamburger" onClick={() => this.handleToggleSidenav()}><Icon name="sidebar" /></Menu.Item>
          <Container className="navbar">
            <Menu.Item className="user-info">
              {username.toString()}
            </Menu.Item>
            <Menu.Item className="user-info">
              {/* userPoints.toString() */}
              {/*@todo display user points*/}
              === pts
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
            <Menu.Item as={NavLink} activeClassName="active" to="/bet/myBets">
              <Icon name="ticket" />
              My Bets
            </Menu.Item>
            <Menu.Item as={NavLink} activeClassName="active" to="/xd">
              <Icon name="gamepad" />
              Games
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
              <Route path="/bet" component={BetLayout} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default UserLayout;
