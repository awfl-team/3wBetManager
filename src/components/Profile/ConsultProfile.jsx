import React from 'react';
import {
  Button, Container, Grid, Header, Icon, Rating,
} from 'semantic-ui-react';
import User from '../../model/User';
import UserService from '../../service/UserService';
import GraphService from '../../service/GraphService';
import StatsBuilderService from '../../service/StatsBuilderService';
import {Doughnut} from 'react-chartjs-2';

let dataBuild;

class ConsultProfile extends React.Component {
  state = {
    user: User,
    dataSetBets: [],
    dataSetCoins: [],
    dataDots: [],
  };

  // @todo Refactor stats of consultProfile and profile as a component
  // @todo Must have a user given. Consult profile must have a user. Profile must have current user.

  componentWillMount() {
    GraphService.getBetsByTypeData().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0 && (response.data.wrongBets !== 0 && response.data.okBets !== 0 && response.data.perfectBets !== 0)) {
        let labels = ['Wrong', 'Ok', 'Perfect'];
        let nbBets = Object.values(datas);
        let colors = ['#DB2828', '#F2711C', '#21BA45'];
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['']);
      }
      this.setState({dataSetBets: dataBuild});
    });

    GraphService.getCoinsStats().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0) {
        let labels = ['Coins used to bet', 'Bets earnings'];
        let nbBets = Object.values(datas);
        let colors = ['#3949ab', '#d81b60', '#ffa000'];
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['']);
      }
      this.setState({dataSetCoins: dataBuild});
    });

    // @todo finish graph stats backend
    // GraphService.getGraphData().then((resp) => {
    //   const datas = resp.data;
    //
    //   if (resp.data.length > 0 ) {
    //     let dates = [];
    //     let pts = [];
    //     datas.forEach((data, index) => {
    //       dates.push(data.date);
    //       pts.push(data.pts);
    //     });
    //     dataBuild = StatsBuilderService.buildStatsBetsGraph(pts, dates);
    //   } else {
    //     dataBuild = StatsBuilderService.buildStatsBetsDougnut(['0'], ['NaN']);
    //   }
    //
    //   this.setState({dataDots: dataBuild});
    // });
  }

  componentDidMount() {
    UserService.getUserById(this.props.match.params.userId)
      .then(response => this.setState({ user: response.data }));
  }

  render() {
    const {user} = this.state;
    return (
        <div id="profile">
          {user.IsPrivate === false &&
            <Header as="h1" icon textAlign="center">
              <Icon name="user" circular/>
              <Header.Content>
                {user.Username}
                's profile and stats</Header.Content>
            </Header>
          }
          { user.IsPrivate === true &&
          <Header as="h1" icon textAlign="center">
            <Icon name="eye slash" circular/>
            <Header.Content>
              { user.Username }
              's profile is private</Header.Content>
          </Header>
          }
          <Container textAlign="center" className="container-centered">
            <div className="profile-lives">
              <Rating icon='heart' rating={user.Life} maxRating={3} disabled size="massive" />
            </div>
            <div className="profile-coins">
              <Icon color='yellow' name='copyright' size="big" />
              <label>{user.Point}</label>
            </div>
            { user.IsPrivate === false &&
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
                      { /*<Line data={this.state.dataDots} fill="false" legend={{position:
                       'bottom'}}/>*/ }
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
            }
            { user.IsPrivate === true &&
            <h2>You are only able to see his lives, coins and username</h2>
            }
          </Container>
        </div>
    );
  }
}

export default ConsultProfile;
