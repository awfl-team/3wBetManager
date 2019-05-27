import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Container, Divider, Header, Icon, Modal, Popup, Radio, Rating,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addSnackBar } from '../../actions/SnackBarActions';
import UserHttpService from '../../httpServices/UserHttpService';
import AuthHelper from '../../helpers/AuthHelper';
import User from '../../model/User';
import ProfileStats from '../Stats/ProfileStats';
import withAuth from '../AuthGuard/AuthGuard';
import ProfilSkeleton from '../SkeletonLoaders/ProfilSkeleton';

function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

class Profile extends React.Component {
  state = {
    user: User,
    items: [],
    modalDeleteOpen: false,
    modalResetOpen: false,
    isPrivate: false,
    canReset: true,
    userLives: '',
    userPoints: '',
    isLoading: true,
  };

  // @todo Refactor stats of consultProfile and profile as a component

  componentDidMount() {
    UserHttpService.getFromToken()
      .then((response) => {
        const canReset = response.data.Items.filter(i => i.Type === 'LIFE').length !== 0;
        this.setState({
          user: response.data,
          items: response.data.Items,
          isPrivate: response.data.IsPrivate,
          canReset,
          userLives: response.data.Items.filter(i => i.Type === 'LIFE').length,
          userPoints: response.data.Point,
          isLoading: false,
        });
      });
  }

  handleOpenDelete = () => this.setState({ modalDeleteOpen: true });

  handleCloseDelete = () => this.setState({ modalDeleteOpen: false });

  handleOpenReset = () => this.setState({ modalResetOpen: true });

  handleCloseReset = () => this.setState({ modalResetOpen: false });

  handleDelete = () => {
    AuthHelper.logout();
    UserHttpService.deleteUser(this.state.user).then(() => this.props.history.push('/'));
  };

  handleReset = () => {
    UserHttpService.resetUser()
      .then(() => {
        this.setState({ modalResetOpen: false });
        UserHttpService.getFromToken()
          .then((response) => {
            this.setState({
              user: response.data,
              isPrivate: response.data.IsPrivate,
              items: response.data.Items,
              canReset: response.data.Life !== 0,
              userLives: response.data.Items.filter(i => i.Type === 'LIFE').length,
              userPoints: response.data.Point,
            });
          });
        this.props.addSnackbar({
          message: 'Reset successfull',
          type: 'success',
        });
      });
  };

  handleVisibilityUser = () => {
    const { isPrivate } = this.state;
    this.setState({ isPrivate: !isPrivate });
    UserHttpService.handleVisibilityUser(!isPrivate)
      .then(() => {
        this.props.addSnackbar({
          message: 'Profile\'s visibility updated',
          type: 'success',
        });
      });
  };

  render() {
    const {
      user, canReset, userLives, userPoints, isPrivate,
      modalDeleteOpen, modalResetOpen, items, isLoading,
    } = this.state;
    return (
      <div id="profile">
        { isLoading ? (
          <ProfilSkeleton />
        ) : (
          <div>
            <Header as="h1" icon textAlign="center">
              <Icon name="user" circular />
              <Header.Content>My profile</Header.Content>
            </Header>
            <Container textAlign="center" className="container-centered">
              <div className="profile-accessibility">
                <Popup
                  trigger={(
                    <Icon
                      name={isPrivate ? 'eye slash' : 'eye'}
                      size="big"
                      className="whiteColor"
                    />
                  )}
                  content={isPrivate ? 'Your profile is private' : 'Your profile is public'}
                  inverted
                  position="left center"
                />
                <Radio toggle onChange={this.handleVisibilityUser} checked={isPrivate} />
              </div>
              <div className="profile-lives">
                <Popup
                  trigger={(
                    <div>
                      <Icon color="red" name="heart" size="big" />
                      <span>{userLives}</span>
                    </div>
                  )}
                  content={userLives !== 0 ? 'You can reset your account' : 'You can\'t reset your account anymore'}
                  inverted
                  position="right center"
                />
              </div>
              <div className="profile-coins">
                <Icon color="yellow" name="copyright" size="big" />
                <span>{userPoints}</span>
              </div>
              <Popup
                trigger={(
                  <Link to="/items" className="profile-items">
                    <Icon color="brown" name="bolt" size="big" />
                    <span>{items.filter(i => i.Type !== 'LIFE').length}</span>
                  </Link>
                )}
                content="Your items"
                inverted
                position="right center"
              />
              <div className="userInfo-container">
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
                    trigger={(
                      <Button
                        onClick={this.handleOpenDelete}
                        circular
                        icon="trash"
                        color="red"
                        size="huge"
                      />
                    )}
                    open={modalDeleteOpen}
                    onClose={this.handleCloseDelete}
                    basic
                    size="small"
                  >
                    <Header
                      icon="exclamation triangle"
                      content="Are you sure ?"
                      as="h1"
                      textAlign="center"
                    />
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
                  {canReset === true
                  && (
                    <Modal
                      trigger={(
                        <Button
                          onClick={this.handleOpenReset}
                          circular
                          icon="eraser"
                          color="black"
                          size="huge"
                        />
                      )}
                      open={modalResetOpen}
                      onClose={this.handleCloseReset}
                      basic
                      size="small"
                    >
                      <Header
                        icon="exclamation triangle"
                        content="Are you sure ?"
                        as="h1"
                        textAlign="center"
                      />
                      <Modal.Content>
                        <h3>
                          If you confirm this action,
                          your earned points, bets and statistics will be reset !
                          In exchange, your account will be reset with 500
                          <Icon color="yellow" name="copyright" />
                          to reborn from ashes.
                          <br />
                          <br />
                          You will loose one
                          {' '}
                          <Rating icon="heart" defaultRating={1} maxRating={1} disabled size="huge" />
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
                  )}
                </Container>
              </div>
            </Container>
            <Divider section />

            <Header as="h1" icon textAlign="center">
              <Icon name="pie graph" circular />
              <Header.Content>Stats</Header.Content>
            </Header>
          </div>
        )
        }
        <ProfileStats user={user} />
      </div>
    );
  }
}

const userProfile = connect(null, mapDispatchToProps)(Profile);

export default withAuth(userProfile);
