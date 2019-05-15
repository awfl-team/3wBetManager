import React, { ComponentState } from 'react';
import {
  Button, Header, Icon, Input, Label, Pagination, Radio, Table,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addSnackBar } from '../../actions/SnackBarActions';
import withAuthAdmin from '../AuthGuardAdmin/AuthGuardAdmin';
import User from '../../model/User';
import UserService from '../../service/UserService';

function mapDispatchToProps(dispatch: any) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

interface AdminUserTableState extends ComponentState {
  users: User[];
  totalPages: number;
  totalUsers: number;
}

class AdminUserTable extends React.Component<any, AdminUserTableState> {
  state: {
    users: User[],
    totalPages: number,
    totalUsers: number,
  } = {
    users: [],
    totalPages: 1,
    totalUsers: 0,
  };

  componentDidMount() {
    UserService.getAllUsersPaginated()
      .then((response) => {
        this.setState({
          users: response.data.Items,
          totalPages: response.data.TotalPages,
          totalUsers: response.data.TotalUsers,
        });
      });
  }

  getNextUsers(event: any) {
    UserService.getAllUsersPaginated(event.target.getAttribute('value'))
      .then((response) => {
        this.setState({
          users: response.data.Items,
          totalPages: response.data.TotalPages,
          totalUsers: response.data.TotalUsers,
        });
      });
  }

  searchUsers(event: any) {
    const searchTerm = event.target.closest('div.input').getElementsByTagName('input')[0].value;
    if (searchTerm.length >= 3 || (searchTerm.length > 0 && event.key === 'Enter')) {
      UserService.searchUsers(searchTerm)
        .then((response) => {
          this.setState({
            users: response.data,
            totalPages: response.data.TotalPages,
            totalUsers: response.data.TotalUsers,
          });
        });
    }
  }

  handleClick(user: User) {
    UserService.getUserById(user.Id).then((resp) => {
      const userToUpdate = resp.data;
      const userAfterUpdate = new User();
      userAfterUpdate.Id = user.Id;
      if (userToUpdate.Role === 'ADMIN') {
        userAfterUpdate.Role = 'USER';
      } else {
        userAfterUpdate.Role = 'ADMIN';
      }
      UserService.updateRoleUser(userAfterUpdate).then(() => {
        this.props.addSnackbar({
          message: `${userToUpdate.Username}'s role updated`,
          type: 'success',
        });
      });
    });
  }

  handleDelete(user: User) {
    const users: User[] = this.state.users;
    UserService.deleteUser(user).then(() => {
      if (users.indexOf(user) !== -1) {
        users.splice(users.indexOf(user), 1);
      }
      this.setState({ users });
      this.props.addSnackbar({
        message: `${user.Username}'s account deleted`,
        type: 'success',
      });
    });
  }

  clearSearch() {
    UserService.getAllUsersPaginated()
      .then((response) => {
        this.setState({
          users: response.data.Items,
          totalPages: response.data.TotalPages,
          totalUsers: response.data.TotalUsers,
        });
      });
  }

  render() {
    const {
      users, totalPages, totalUsers,
    } = this.state;

    return (
      <div id="adminUserTable">
        <Header as="h1" icon={true} textAlign="center">
          <Icon name="users" circular={true} />
          <Header.Content>
              Users (
            {totalUsers}
              )
          </Header.Content>
        </Header>
        <div className="userTableHeader">
          <Input type="search" labelPosition="right" placeholder="Search a user">
            <Label
              icon="close"
              className="redColor"
              circular={true}
              onClick={() => this.clearSearch()}
            />
            <input
              onKeyPress={event => this.searchUsers(event)}
              onChange={event => this.searchUsers(event)}
            />
            <Label
              icon="search"
              className="greenColor"
              circular={true}
              onClick={event => this.searchUsers(event)}
            />
          </Input>
          <Link to="/admin/addUser" className="button ui green">
            <Icon name="add" />
            Create a user
          </Link>
        </div>
        <div className="scrollable-table-container">
          <Table
            celled={true}
            striped={true}
            unstackable={true}
            inverted={true}
            className="primary-bg"
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Score</Table.HeaderCell>
                <Table.HeaderCell>Lives</Table.HeaderCell>
                <Table.HeaderCell>Admin</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map(user => (
                <Table.Row key={user.Id}>
                  <Table.Cell>{user.Username}</Table.Cell>
                  <Table.Cell>{user.Email}</Table.Cell>
                  <Table.Cell>
                    <span>{user.Point}</span>
                    {' '}
                    <Icon color="yellow" name="copyright" size="large" />
                  </Table.Cell>
                  <Table.Cell>
                    <div>
                      <span>{user.Items.filter(i => i.Type === 'LIFE').length}</span>
                      {' '}
                      <Icon color="red" name="heart" size="large" />
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Radio
                      toggle={true}
                      disabled={this.props.user.email === user.Email}
                      defaultChecked={user.Role === 'ADMIN'}
                      onClick={() => this.handleClick(user)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {user.Email !== this.props.user.email
                    && (
                      <Link to={`/user/${user.Id}`} className="button ui blue small icon">
                        <Icon name="eye" className="whiteColor" />
                      </Link>
                    )
                    }
                    {user.Email !== this.props.user.email
                    && (
                      <Button
                        type="button"
                        className="button ui red small icon"
                        onClick={() => this.handleDelete(user)}
                      >
                        <Icon name="trash" />
                      </Button>
                    )
                    }
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        {totalPages >= 2 && totalUsers > 10
        && (
          <Pagination
            ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
            firstItem={null}
            lastItem={null}
            defaultActivePage={1}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            totalPages={totalPages}
            onPageChange={event => this.getNextUsers(event)}
          />
        )
        }
      </div>
    );
  }
}

const adminUsers = connect(null, mapDispatchToProps)(AdminUserTable);
export default withAuthAdmin(adminUsers);
