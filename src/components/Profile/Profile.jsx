import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Container, Divider, Grid, Header, Icon, Modal, Popup, Radio, Rating,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import UserService from '../../service/UserService';
import AuthService from '../../service/AuthService';
import User from '../../model/User';
import { addSnackBar } from '../../actions/SnackBarActions';
import withAuth from '../AuthGuard/AuthGuard';
import { Doughnut, Line } from "react-chartjs-2";
import GraphService from "../../service/GraphService";
import StatsBuilderService from "../../service/StatsBuilderService";
function mapDispatchToProps(dispatch) {
  return {
    addSnackbar: ({ message, type }) => dispatch(addSnackBar(message, type)),
  };
}

let dataBuild;

class Profile extends React.Component {
  state = {
    user: User,
    modalDeleteOpen: false,
    modalResetOpen: false,
    isPrivate: false,
    canReset: true,
    userLives: '',
    userPoints: '',
    dataSetBets: [],
    dataSetCoins: [],
    dataDots: [],
  };

  componentWillMount() {
    GraphService.getBetsByTypeData().then((resp) => {
      const datas = resp.data;
      let labels = Object.keys(datas);
      let nbBets = Object.values(datas);
      let colors = ['#DB2828', '#F2711C', '#21BA45'];

      dataBuild = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      this.setState({dataSetBets: dataBuild});
    });

    GraphService.getCoinsStats().then((resp) => {
      const datas = resp.data;
      let labels = ['Shop buys', 'Bets submitions', 'Bets earnings'];
      let nbBets = Object.values(datas);
      let colors = ['#3949ab', '#d81b60', '#ffa000'];
      let labelPosition = 'right';

      dataBuild = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      this.setState({dataSetCoins: dataBuild});
    });

    GraphService.getGraphData().then((resp) => {
      const datas = resp.data;
      let dates = [];
      let pts = [];
      datas.forEach((data, index) => {
        dates.push(data.date);
        pts.push(data.pts);
      });

      dataBuild = StatsBuilderService.buildStatsBetsGraph(pts, dates);
      this.setState({dataDots: dataBuild});
    });
  }

  componentDidMount() {
    UserService.getFromToken()
      .then((response) => {
        this.setState({ user: response.data });
        this.setState({ isPrivate: response.data.IsPrivate });
        this.setState({ canReset: response.data.Life !== 0 });
        this.setState({ userLives: response.data.Life });
        this.setState({ userPoints: response.data.Point });
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
      .then(() => {
        this.setState({ modalResetOpen: false });
        this.setState({ userPoints: 500 });
        this.setState({ userLives: this.state.userLives - 1 });
        this.props.addSnackbar({
          message: 'Reset successfull',
          type: 'success',
        });
      });
  };

  handleVisibilityUser = () => {
    this.setState({ isPrivate: !this.state.isPrivate });
    UserService.handleVisibilityUser(!this.state.isPrivate)
      .then(() => {
        this.props.addSnackbar({
          message: 'Profile\'s visibility updated',
          type: 'success',
        });
      });
  };

  render() {
    const {
      user, isPrivate, canReset, userLives, userPoints, dataDots, dataPie
    } = this.state;
    return (
      <div id="profile">
        <Header as="h1" icon textAlign="center">
          <Icon name="user" circular />
          <Header.Content>My profile</Header.Content>
        </Header>
        <Container textAlign="center" className="container-centered">
          <div className="profile-accessibility">
            <Popup
              trigger={<Icon name={this.state.isPrivate ? 'eye slash' : 'eye'} size="big" />}
              content={this.state.isPrivate ? 'Your profile is private' : 'Your profile is public'}
              inverted
              position="left center"
            />
            <Radio toggle onChange={this.handleVisibilityUser} checked={this.state.isPrivate} />
          </div>
          <div className="profile-lives">
            <Popup
              trigger={<Rating icon="heart" rating={userLives} maxRating={3} disabled size="massive" />}
              content={user.Life !== 0 ? 'You can reset your account' : 'You can\'t reset your account anymore'}
              inverted
              position="right center"
            />

          </div>
          <div className="profile-coins">
            <Icon color="yellow" name="copyright" size="big" />
            <label>{userPoints}</label>
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
            && (
            <Modal
              trigger={<Button onClick={this.handleOpenReset} circular icon="eraser" color="black" size="huge" />}
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
                  In exchange, your account will be reset with 500
                  {' '}
                  <Icon color="yellow" name="copyright" />
                  {' '}
to reborn from ashes.
                  <br />
                  <br />
                  You will loose one&nbsp;
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
            )
            }

          </Container>
        </Container>

        <Divider section />

        <Header as="h1" icon textAlign="center">
          <Icon name="pie graph" circular />
          <Header.Content>Stats</Header.Content>
        </Header>
        <Container textAlign="center" fluid>
          <Grid>
            <Grid.Row columns={16} divided>
              <Grid.Column textAlign="center" computer={8} tablet={16}>
                <div className="doughnut-container-max-size">
                  <h3>Finished bets per type</h3>
                  <Doughnut data={this.state.dataSetBets} legend={{position: 'bottom'}}/>
                </div>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={8} tablet={16}>
                <div className="doughnut-container-max-size">
                  <h3>Coins total usages per purpose</h3>
                  <Doughnut data={this.state.dataSetCoins} legend={{position: 'bottom'}}/>
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={16}>
              <Grid.Column textAlign="center" computer={16}>
                <div className="graph-container-max-size">
                  <h3>Earned coins since last reset per day</h3>
                  <Line data={this.state.dataDots} fill="false" legend={{position: 'bottom'}}/>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

const userProfile = connect(null, mapDispatchToProps)(Profile);

export default withAuth(userProfile);
