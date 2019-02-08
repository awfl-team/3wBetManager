import React from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
  Input,
  Pagination,
  Radio,
  Rating,
  Table
} from 'semantic-ui-react';
import withAuthAdmin from '../AuthGuardAdmin/AuthGuardAdmin';
import User from '../../model/User';
import UserService from '../../service/UserService';
import {Link} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import {addSnackBar} from "../../actions/SnackBarActions";

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
        this.setState({ users: response.data.items,
          totalPages: response.data.totalPages,
          totalUsers: response.data.totalUsers });
      });
  }

  getNextUsers(event) {
    UserService.getAllUsersPaginated(event.target.getAttribute('value'))
      .then((response) => {
        this.setState({ users: response.data.items,
          page: response.data.page,
          totalPages: response.data.totalPages,
          totalUsers: response.data.totalUsers  });
      });
  }

  render() {
    const { users, totalPages, page, totalUsers } = this.state;
    return (
      <div id="adminUserTable">
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>Users ({totalUsers})</Header.Content>
        </Header>
        <Container fluid className="container-centered">
          <div className="userTableHeader">
            <Input type="search" icon={<Icon name='search' inverted circular link />}  placeholder="Search a user" />
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
                  <Table.Cell><Icon color="yellow" name='copyright' size="big" />
                    <label color="yellow">{user.Point}</label></Table.Cell>
                  <Table.Cell>
                    <Rating icon='heart' rating={user.Life} maxRating={3} disabled size="huge" />
                  </Table.Cell>
                  <Table.Cell>
                    <Radio toggle defaultChecked={user.Role === "ADMIN"} onClick={this.handleClick.bind(this, user)} />
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={'/user/' + user.Id} className="button ui blue small icon">
                      <Icon name="eye"/>
                    </Link>

                    <Button type="button" className="button ui red small icon" onClick={this.handleDelete.bind(this, user, index)}>
                      <Icon name="trash"/>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Pagination
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={null}
            lastItem={null}
            defaultActivePage={1}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={totalPages}
            onPageChange={this.getNextUsers.bind(this)}
          />
        </Container>
      </div>
    );
  }


}

const AdminUsers = connect(null, mapDispatchToProps)(AdminUserTable);
export default withAuthAdmin(AdminUsers);
