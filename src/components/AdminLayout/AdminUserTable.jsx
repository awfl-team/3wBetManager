import React from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
  Input, Label,
  Pagination,
  Radio,
  Rating,
  Table,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { addSnackBar } from '../../actions/SnackBarActions';
import withAuthAdmin from '../AuthGuardAdmin/AuthGuardAdmin';
import User from '../../model/User';
import UserService from '../../service/UserService';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class AdminUserTable extends React.Component {
  state = {
    users: [],
    totalPages: 1,
    page: 1,
    totalUsers: 0,
    showPagination: true,
  };

  handleClick(user) {
    UserService.getUserById(user.Id).then((resp) => {
      const userToUpdate = resp.data
      const userAfterUpdate = new User();
      userAfterUpdate.Id = user.Id;
      if (userToUpdate.Role === 'ADMIN') {
        userAfterUpdate.Role = 'USER';
      } else {
        userAfterUpdate.Role = 'ADMIN';
      }
      UserService.updateRoleUser(userAfterUpdate).then((resp) => {
        this.props.addSnackbar({
          message: `${userToUpdate.Username}'s role updated`,
          type: 'success',
        });
      });
    });
  };

  handleDelete(user, index) {
    UserService.deleteUser(user).then(() => {
      this.props.addSnackbar({
        message: `${user.Username}'s account deleted`,
        type: 'success',
      });
      document.getElementById(index).remove();
    });
  }

  componentDidMount() {
    UserService.getAllUsersPaginated()
      .then((response) => {
        this.setState({ users: response.data.Items,
          totalPages: response.data.TotalPages,
          totalUsers: response.data.TotalUsers });
      });
  }

  getNextUsers(event) {
    UserService.getAllUsersPaginated(event.target.getAttribute('value'))
      .then((response) => {
        this.setState({ users: response.data.Items,
          page: response.data.Page,
          totalPages: response.data.TotalPages,
          totalUsers: response.data.TotalUsers  });
      });
  }

  searchUsers(event) {
    const searchTerm = event.target.closest('div.input').getElementsByTagName('input')[0].value;
    if (searchTerm.length > 0) {
      UserService.searchUsers(searchTerm)
        .then((response) => {
          this.setState({ users: response.data,
            showPagination: false,
          });
        });
    }
  }

  clearSearch() {
    UserService.getAllUsersPaginated()
      .then((response) => {
        this.setState({ users: response.data.Items,
          totalPages: response.data.TotalPages,
          totalUsers: response.data.TotalUsers,
          showPagination: true,
        });
      });
  }

  render() {
    const { users, totalPages, totalUsers, showPagination } = this.state;

    return (
      <div id="adminUserTable">
        <Header as="h1" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>Users ({totalUsers})</Header.Content>
        </Header>
        <Container fluid className="container-centered">
          <div className="userTableHeader">
            <Input type="search" labelPosition="right" placeholder="Search a user" >
              <Label icon="close" color="red" circular onClick={this.clearSearch.bind(this)} />
              <input />
              <Label icon="search" color="green" circular onClick={this.searchUsers.bind(this)} />
            </Input>
            <Link to="/admin/addUser" className="button ui green">
              <Icon name="add" /> Create a user
            </Link>
          </div>
          <Table celled striped unstackable inverted>
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
              {users.map((user, index) => (
                <Table.Row key={index} id={index}>
                  <Table.Cell>{user.Username}</Table.Cell>
                  <Table.Cell>{user.Email}</Table.Cell>
                  <Table.Cell><Icon color="yellow" name="copyright" size="big" />
                    <label color="yellow">{user.Point}</label></Table.Cell>
                  <Table.Cell>
                    <Rating icon="heart" rating={user.Life} maxRating={3} disabled size="huge" />
                  </Table.Cell>
                  <Table.Cell>
                    <Radio toggle defaultChecked={user.Role === "ADMIN"} onClick={this.handleClick.bind(this, user)} />
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={'/user/' + user.Id} className="button ui blue small icon">
                      <Icon name="eye" />
                    </Link>

                    <Button type="button" className="button ui red small icon" onClick={this.handleDelete.bind(this, user, index)}>
                      <Icon name="trash" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showPagination === true &&
            <Pagination
              ellipsisItem={{content: <Icon name="ellipsis horizontal" />, icon: true}}
              firstItem={null}
              lastItem={null}
              defaultActivePage={1}
              prevItem={{content: <Icon name="angle left" />, icon: true}}
              nextItem={{content: <Icon name="angle right" />, icon: true}}
              totalPages={totalPages}
              onPageChange={this.getNextUsers.bind(this)}
            />
          }
        </Container>
      </div>
    );
  }


}

const AdminUsers = connect(null, mapDispatchToProps)(AdminUserTable);
export default withAuthAdmin(AdminUsers);
