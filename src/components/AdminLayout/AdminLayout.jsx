import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { NavLink, Route } from 'react-router-dom';
import AdminUserTable from './AdminUserTable';
import AdminTaskManager from './AdminTaskManager';
import AdminItemsManager from './AdminItemsManager';
import UserForm from '../UserForm/UserForm';
import withAuthAdmin from '../AuthGuard/AuthGuard';

class AdminLayout extends React.Component {
  state = { activeItem: 'manageUsers' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div id="AdminLayout">
        <Container fluid>
          <div id="inlineMenu">
            <Menu>
              <Menu.Item
                as={NavLink}
                name="manageUsers"
                onClick={this.handleItemClick}
                active={activeItem === 'manageUsers'}
                to="/admin/users"
              >
                  Manage users
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                name="manageItems"
                onClick={this.handleItemClick}
                active={activeItem === 'manageItems'}
                to="/admin/items"
              >
                Manage items
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                name="managerTasks"
                onClick={this.handleItemClick}
                active={activeItem === 'managerTasks'}
                to="/admin/tasks"
              >
                Manage tasks
              </Menu.Item>
            </Menu>
          </div>
        </Container>
        <Container fluid>
          <Route path="/admin/users" component={AdminUserTable} />
          <Route path="/admin/tasks" component={AdminTaskManager} />
          <Route path="/admin/addUser" component={UserForm} />
          <Route path="/admin/items" component={AdminItemsManager} />
        </Container>
      </div>
    );
  }
}

export default withAuthAdmin(AdminLayout);
