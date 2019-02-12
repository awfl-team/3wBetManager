import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import DashboardService from '../../service/DashboardService';
import StatsBuilderService from '../../service/StatsBuilderService';
import {Container, Grid, Header, Icon} from "semantic-ui-react";

let dataBuild;

class Dashboard extends React.Component {
  state = {data: []};

  componentWillMount() {
    DashboardService.getuserDashboard().then((res) => {
      // Should return a flat 1 dim array like [1,2,3]
    });
    dataBuild = StatsBuilderService.buildStatsBetsByType([10,10,10,10], ['topkek', 'erf', 'jpp', ':spied:'], ['#4caf50', '#2196f3', '#f2711c', '#2d2d2d']);
    this.setState({data: dataBuild});
  }

  changeData = () => {
    dataBuild = StatsBuilderService.buildStatsBetsByType([50,50], ['topkek', 'erf'], ['#4caf50', '#2196f3']);
    this.setState({data: dataBuild});
  }

  render() {
    return (
      <div id="dashboard">
        <Header as="h2" icon textAlign="center">
          <Icon name="dashboard" circular />
          <Header.Content>Dashboard</Header.Content>
        </Header>
        <Container textAlign="center" fluid>
          <Grid>
            <Grid.Row columns={16} divided>
              <Grid.Column textAlign="center" computer={8} tablet={16}>
                <div className="doughnut-max-size">
                  <Doughnut data={this.state.data} legend={{position: 'left'}}/>
                </div>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={8} tablet={16}>
                <button onClick={this.changeData}>Change data</button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={16} divided>
              <Grid.Column textAlign="center" computer={8} tablet={16}>
                <div className="doughnut-max-size">
                  <Doughnut data={this.state.data} legend={{position: 'left'}}/>
                </div>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={8} tablet={16}>
                <button onClick={this.changeData}>Change data</button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
