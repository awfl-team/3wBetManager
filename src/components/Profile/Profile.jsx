import React from 'react';
import {Button, Container, Divider, Header, Icon, Modal, Radio} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import User from '../../model/User';

class Profile extends React.Component {
  state = {
    user: User,
    modalDeleteOpen: false,
    modalResetOpen: false,
  };

  componentDidMount() {
    UserService.getFromToken()
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((error) => {
        this.setState({ message: error.response.data });
      });
  }

  handleOpenDelete = () => this.setState({ modalDeleteOpen: true });

  handleCloseDelete = () => this.setState({ modalDeleteOpen: false });

  handleOpenReset = () => this.setState({ modalResetOpen: true });

  handleCloseReset = () => this.setState({ modalResetOpen: false });

  handleDelete = () => {
    AuthService.logout();
    UserService.deleteUser(this.state.user)
      .then(() => this.props.history.push('/'))
      .catch((error) => {
        this.setState({ modalDeleteOpen: false });
        this.props.addSnackbar({ message: error.response.data, type: 'danger' });
      });
  };

  handleReset = () => {
    UserService.resetUser(this.state.user)
      .then(() => this.props.history.push('/dashboard'));
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
          <div className="profile-accessibility"><label>Private mode</label><Radio toggle /></div>
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
              trigger={<Button onClick={this.handleOpenDelete} circular icon="trash" color="red" size="huge" />}
              open={this.state.modalDeleteOpen}
              onClose={this.handleCloseDelete}
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
                <Button color="red" onClick={this.handleCloseDelete} inverted>
                  <Icon name="remove" />
                  Cancel
                </Button>
                <Button color="green" onClick={this.handleDelete} inverted>
                  <Icon name="checkmark" />
              Yes, delete me !
                </Button>
              </Modal.Actions>
            </Modal>
            <Link to="/update-profile" className="button ui circular orange huge icon">
              <Icon name="pencil"/>
            </Link>
            <Modal
              trigger={<Button onClick={this.handleOpenReset} circular icon="eraser" color="secondary" size="huge" />}
              open={this.state.modalResetOpen}
              onClose={this.handleCloseReset}
              basic
              size="small"
            >
              <Header icon="exclamation triangle" content="Are you sure ?" as="h1" textAlign="center" />
              <Modal.Content>
                <h3>
                  If you confirm this action, your earned points, bets and statistics will be reset !
                  In exchange, your account will be credited by 500pts to reborn from ashes.
                </h3>
              </Modal.Content>
              <Modal.Actions>
                <Button color="red" onClick={this.handleCloseReset} inverted>
                  <Icon name="remove" />
                  Cancel
                </Button>
                <Button color="green" onClick={this.handleReset} inverted>
                  <Icon name="checkmark" />
                  Yes, do it !
                </Button>
              </Modal.Actions>
            </Modal>
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
