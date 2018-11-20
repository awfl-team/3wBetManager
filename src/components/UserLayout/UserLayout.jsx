import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import {
  Container, Dropdown, Icon, Menu, Segment, Sidebar,
} from 'semantic-ui-react';
import Dashboard from '../Dashboard/Dashboard';

class UserLayout extends React.Component {
  state = { visible: true };

  handleToggleSidenav = () => this.setState(previousState => ({ visible: !previousState.visible }));

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Menu inverted>
          <Container>
            <Menu.Item as="a" onClick={() => this.handleToggleSidenav()}><Icon name="sidebar" /></Menu.Item>
            <Menu.Item as="a" header>
              Project Name
            </Menu.Item>
            <Menu.Item as="a">Home</Menu.Item>

            <Dropdown item simple text="Dropdown">
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
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

          <Sidebar.Pusher>
            <Segment basic>
              <Route path="/dashboard" component={Dashboard} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default UserLayout;
