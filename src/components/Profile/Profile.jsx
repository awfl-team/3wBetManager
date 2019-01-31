import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Container, Divider, Header, Icon, Label, Modal, Popup, Radio, Rating,
} from 'semantic-ui-react';
import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import User from '../../model/User';
import withAuth from '../AuthGuard/AuthGuard';

class Profile extends React.Component {
  state = {
    user: User,
    modalDeleteOpen: false,
    modalResetOpen: false,
    isPrivate: false,
    canReset: true,
  };

  componentDidMount() {
    UserService.getFromToken()
      .then((response) => {
        this.setState({ user: response.data });
        this.setState({ isPrivate: response.data.IsPrivate });
        this.setState({ canReset: response.data.Life !== 0 });
      });
  }

  handleOpenDelete = () => this.setState({ modalDeleteOpen: true });

  handleCloseDelete = () => this.setState({ modalDeleteOpen: false });

  handleOpenReset = () => this.setState({ modalResetOpen: true });

  handleCloseReset = () => this.setState({ modalResetOpen: false });

  handleDelete = () => {
    AuthService.logout();
    UserService.deleteUser(this.state.user).then(() => this.props.history.push('/'));
  };

  handleReset = () => {
    UserService.resetUser()
      .then(() => this.props.history.push('/dashboard'));
  };

  handleVisibilityUser = () => {
    this.setState({ isPrivate: !this.state.isPrivate });
    UserService.handleVisibilityUser(!this.state.isPrivate)
      .then(() => {
        // @todo call success snackbar
      });
  };

  render() {
    const { user, isPrivate, canReset } = this.state;
    return (
      <div id="profile">
        <Header as="h2" icon textAlign="center">
          <Icon name="user" circular />
          <Header.Content>My profile</Header.Content>
        </Header>
        <Container textAlign="center" className="container-centered">
          <div className="profile-accessibility">
            <Popup
              trigger={<Icon name={ this.state.isPrivate ? 'eye slash': 'eye' } size="big" />}
              content={this.state.isPrivate ? 'Your profile is private': 'Your profile is public' }
              inverted
              position="left center"
            />
            <Radio toggle onChange={this.handleVisibilityUser} checked={this.state.isPrivate}/>
          </div>
          <div className="profile-lives">
            <Popup
              trigger={<Rating icon='heart' rating={user.Life} maxRating={3} disabled size="massive" />}
              content={user.Life !== 0 ? `You can reset your account` : 'You can\'t reset your account anymore'}
              inverted
              position="right center"
            />

      </div>
          <div className="profile-coins">
            <Icon color='yellow' name='copyright' size="big" />
            <label>{user.Point}</label>
          </div>
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
              <Icon name="pencil" />
            </Link>
            { canReset === true
            && <Modal trigger={<Button onClick={this.handleOpenReset} circular icon="eraser" color="black" size="huge" />}
              open={this.state.modalResetOpen}
              onClose={this.handleCloseReset}
              basic
              size="small"
            >
              <Header icon="exclamation triangle" content="Are you sure ?" as="h1" textAlign="center" />
              <Modal.Content>
                <h3>
                  If you confirm this action,
                  your earned points, bets and statistics will be reset !
                  In exchange, your account will be credited by 500pts to reborn from ashes.
                  <br/><br/>
                  You will loose one&nbsp;
                  <Rating icon='heart' defaultRating={1} maxRating={1} disabled size="huge" />
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
            }

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

export default withAuth(Profile);
