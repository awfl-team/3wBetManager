import React from 'react';
import {
  Button, Container, Divider, Header, Icon, Modal,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import User from '../../model/User';

class Profile extends React.Component {
  state = {
    user: User,
    modalOpen: false,
  };

  componentDidMount() {
    // TODO I think is better to use the store in this case
    const token = AuthService.getToken();
    const userInfo = AuthService.getUserInfo(token);
    UserService.getByEmail(userInfo.email)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((error) => {
        this.setState({ message: error.response.data });
      });
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  handleDelete = () => {
    AuthService.logout();
    UserService.deleteUser(this.state.user)
      .then(() => this.props.history.push('/'))
      .catch((error) => {
        this.setState({ modalOpen: false });
        this.props.addSnackbar({ message: error.response.data, type: 'danger' });
      });
  };

  render() {
    const { user } = this.state;
    return (
      <div id="profile">
        <Header as="h2" icon textAlign="center">
          <Icon name="user" circular />
          <Header.Content>My profile</Header.Content>
        </Header>
        <Container textAlign="center" className="container-centered">
          <Button
            content="Email"
            icon="mail"
            fluid
            label={{
              basic: true, pointing: 'left', content: user.Email,
            }}
          />
          <Button
            content="Username"
            icon="user"
            fluid
            label={{
              basic: true, pointing: 'left', content: user.Username,
            }}
          />
          <Button
            color="blue"
            content="Score"
            icon="winner"
            fluid
            label={{
              basic: true, color: 'blue', pointing: 'left', content: `${user.Point} pts`,
            }}
          />
          <Container className="container-actions">
            <Modal
              trigger={<Button onClick={this.handleOpen} circular icon="trash" color="red" size="huge" />}
              open={this.state.modalOpen}
              onClose={this.handleClose}
              basic
              size="small"
            >
              <Header icon="exclamation triangle" content="Are you sure ?" as="h1" textAlign="center" />
              <Modal.Content>
                <h3>
                  If you confirm this action, your profile
                  and all your datas will be wiped from our website !
                </h3>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={this.handleClose} inverted>
                  <Icon name="remove" />
                  Cancel
                </Button>
                <Button color="green" onClick={this.handleDelete} inverted>
                  <Icon name="checkmark" />
              Yes, delete me !
                </Button>
              </Modal.Actions>
            </Modal>
            <Button as={NavLink} to="/update-profile" icon="pencil" circular color="orange" size="huge" />
          </Container>
        </Container>

        <Divider section />

        <Header as="h2" icon textAlign="center">
          <Icon name="pie graph" circular />
          <Header.Content>Stats</Header.Content>
        </Header>
      </div>
    );
  }
}

export default Profile;
