import React from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import {
  Container, Dropdown, Icon, Menu, Segment, Sidebar,
} from 'semantic-ui-react';
import Dashboard from '../Dashboard/Dashboard';
import AuthService from '../../service/AuthService';
import Profile from '../Profile/Profile';

class UserLayout extends React.Component {
  state = {
    visible: true,
    username: Object,
    toHome: false,
    toLogin: false,
  };

  handleToggleSidenav = () => this.setState(previousState => ({ visible: !previousState.visible }));

  logout() {
    AuthService.logout();
    this.setState({ toHome: true });
  }

  render() {
    const {
      visible, username, toHome, toLogin,
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
            <Menu.Item as="a" header>
              Project Name
            </Menu.Item>
            <Menu.Item as="a">Home</Menu.Item>

            <Dropdown item simple text={username.toString()}>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/profile">My profile</Dropdown.Item>
                <Dropdown.Item onClick={() => this.logout()}>logout</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className="dropdown icon" />
                  <span className="text">Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation="push" visible={visible} icon="labeled" inverted vertical width="thin">
            <Menu.Item as={NavLink} activeClassName="active" to="/dashboard">
              <Icon name="home" />
              Home
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
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default UserLayout;
