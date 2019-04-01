import React from 'react';
import {
  Container, Menu,
} from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
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
          <div id="adminMenu">
            <Menu>
              <Menu.Item
                name="manageUsers"
                onClick={this.handleItemClick}
                active={activeItem === 'manageUsers'}
              >
                <Link to="/admin/users" className="ui green icon right labeled button">
                  Manage users
                </Link>
              </Menu.Item>
              <Menu.Item
                name="manageItems"
                onClick={this.handleItemClick}
                active={activeItem === 'manageItems'}
              >
                <Link to="/admin/items" className="ui green icon right labeled button">
                  Manage items
                </Link>
              </Menu.Item>
              <Menu.Item
                name="managerTasks"
                onClick={this.handleItemClick}
                active={activeItem === 'managerTasks'}
              >
                <Link to="/admin/tasks" className="ui green icon right labeled button">
                  Manage tasks
                </Link>
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
