import React from 'react';
import {
  Button, Header, Icon, Input, Label, Modal, Pagination, Table,
} from 'semantic-ui-react';
import UserService from '../../service/UserService';

class Key extends React.Component {
  state = {
    users: [],
    totalPages: 1,
    showPagination: true,
  };

  componentDidMount() {
    UserService.getAllUsersPaginated()
      .then((response) => {
        this.setState({
          users: response.data.Items,
          totalPages: response.data.TotalPages,
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

  render() {
    const {
      users, totalPages, showPagination,
    } = this.state;

    return (
      <div id="bomb">
        <Modal.Content scrolling>
          <Modal.Description>
            <Header as="h1" icon textAlign="center">
              <Icon name="key" circular />
              <Header.Content>
                Key
              </Header.Content>
            </Header>
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
                      <Table.Cell>
                        <Button
                          icon="key"
                          inverted
                          className="green"
                          fluid
                        />
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
          </Modal.Description>
        </Modal.Content>
      </div>
    );
  }
}

export default Key;
