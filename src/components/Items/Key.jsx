import React from 'react';
import {
  Button, Container, Header, Icon, Input, Label, Menu, Pagination, Table,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import UserService from '../../service/UserService';
import Item from '../../model/Item';
import ItemService from '../../service/ItemService';
import { addSnackBar } from '../../actions/SnackBarActions';
import AudioHandlerService from '../../service/AudioHandlerService';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}


class Key extends React.Component {
  state = {
    users: [],
    totalPages: 1,
    nbKeys: 0,
    showPagination: true,
    activeItem: 'items',
  };

  componentDidMount() {
    UserService.getAllUsersPaginated()
      .then((response) => {
        this.setState({
          users: response.data.Items,
          totalPages: response.data.TotalPages,
        });
      });
    UserService.getFromToken().then((res) => {
      this.setState({
        nbKeys: res.data.Items.filter(item => item.Type === Item.TYPE_KEY).length,
      });
    });
  }

  getNextUsers(event) {
    UserService.getAllUsersPaginated(event.target.getAttribute('value'))
      .then((response) => {
        this.setState({
          users: response.data.Items,
          totalPages: response.data.TotalPages,
        });
      });
  }

  handleClick = (userId) => {
    ItemService.useKey(userId).then(() => {
      this.props.addSnackbar({
        message: 'Key used',
        type: 'success',
      });
      this.setState(prevState => ({ nbKeys: prevState.nbKeys - 1 }));
      AudioHandlerService.useKey();
    });
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  clearSearch() {
    UserService.getAllUsersPaginated()
      .then((response) => {
        this.setState({
          users: response.data.Items,
          totalPages: response.data.TotalPages,
          showPagination: true,
        });
      });
  }

  searchUsers(event) {
    const searchTerm = event.target.closest('div.input').getElementsByTagName('input')[0].value;
    if (searchTerm.length >= 3 || (searchTerm.length > 0 && event.key === 'Enter')) {
      UserService.searchUsers(searchTerm)
        .then((response) => {
          this.setState({
            users: response.data,
            showPagination: false,
          });
        });
    }
  }

  render() {
    const {
      users, totalPages, showPagination, nbKeys, activeItem,
    } = this.state;
    const { currentUser } = this.props;

    return (
      <div id="bomb">
        <Container fluid>
          <div id="inlineMenu">
            <Menu>
              <Menu.Item
                as={NavLink}
                name="shop"
                onClick={this.handleItemClick}
                active={activeItem === 'shop'}
                to="/shop"
              >
                Shop
              </Menu.Item>
              <Menu.Item
                as={NavLink}
                name="items"
                onClick={this.handleItemClick}
                active={activeItem === 'items'}
                to="/items"
              >
                My items
              </Menu.Item>
            </Menu>
          </div>
        </Container>
        <Header as="h1" icon textAlign="center">
          <Icon name="key" circular />
          <Header.Content>
            Key (
            { nbKeys }
            )
          </Header.Content>
        </Header>
        <Container textAlign="center" fluid>
          <div className="userTableHeader">
            <Input type="search" labelPosition="right" placeholder="Search a user">
              <Label
                icon="close"
                className="redColor"
                circular
                onClick={() => this.clearSearch()}
              />
              <input
                onKeyPress={event => this.searchUsers(event)}
                onChange={event => this.searchUsers(event)}
              />
              <Label
                icon="search"
                className="greenColor"
                circular
                onClick={event => this.searchUsers(event)}
              />
            </Input>
          </div>
          <div className="scrollable-table-container">
            <Table celled striped unstackable inverted className="primary-bg">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Score</Table.HeaderCell>
                  <Table.HeaderCell>Lives</Table.HeaderCell>
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
                    <Table.Cell textAlign="center">
                      <Button.Group>
                        <Button
                          onClick={() => { this.handleClick(user.Id); }}
                          icon="key"
                          inverted
                          className="green"
                          fluid
                          disabled={nbKeys === 0 || currentUser.unique_name === user.Username}
                        />
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
          {showPagination === true && users.length >= 10
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
        </Container>
      </div>
    );
  }
}


const key = connect(null, mapDispatchToProps)(Key);
export default key;
