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

  componentDidMount() {
    UserService.getAllUsers()
      .then((response) => {
        this.setState({ users: response.data });
      });
  }

  render() {
    const { users } = this.state;
    return (
      <div id="adminUserTable">
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>Users</Header.Content>
        </Header>
        <Container fluid>
          <div className="userTableHeader">
            <Input type="search" placeholder="Search a user" />
            <div className="button ui green"><Icon name="add" /> Add a user</div>
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
                <Table.Row key={index}>
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

                    <Link to={'/users/' + user.Id} className="button ui red small icon">
                      <Icon name="trash"/>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Pagination
            defaultActivePage={5}
            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            totalPages={10}
          />
        </Container>
      </div>
    );
  }


}

const AdminUsers = connect(null, mapDispatchToProps)(AdminUserTable);
export default withAuthAdmin(AdminUsers);
