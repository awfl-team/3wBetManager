import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Container, Grid,
} from 'semantic-ui-react';
import GraphService from '../../service/GraphService';
import StatsBuilderService from '../../service/StatsBuilderService';

let dataBuild;

class ProfileStats extends React.Component {
  state = {
    dataSetBets: [],
    dataSetCoins: [],
    dataSetEarnings: [],
    dataDots: [],
  };

  // @todo Refactor stats of consultProfile and profile as a component

  componentDidMount() {
    GraphService.getBetsByTypeData().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0 && (response.data.wrongBets !== 0 || response.data.okBets !== 0 || response.data.perfectBets !== 0)) {
        const labels = ['Wrong', 'Ok', 'Perfect'];
        const nbBets = Object.values(datas);
        const colors = ['#DB2828', '#F2711C', '#21BA45'];
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['']);
      }
      this.setState({ dataSetBets: dataBuild });
    });

    GraphService.getEarningsStatsPerType().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0) {
        const labels = ['Wrong', 'Ok', 'Perfect'];
        const nbBets = Object.values(datas);
        const colors = ['#DB2828', '#F2711C', '#21BA45'];
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['']);
      }
      this.setState({ dataSetEarnings: { datasets: dataBuild.datasets, labels: dataBuild.labels } });
    });

    GraphService.getCoinsStats().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0) {
        const labels = ['Coins used to bet', 'Bets earnings'];
        const nbBets = Object.values(datas);
        const colors = ['#3949ab', '#d81b60', '#ffa000'];
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['']);
      }
      this.setState({ dataSetCoins: { datasets: dataBuild.datasets, labels: dataBuild.labels } });
    });

    // @todo finish graph stats backend
    GraphService.getGraphData().then((resp) => {
      const datas = resp.data;

      if (resp.data.length > 0 ) {
        let dates = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        let pts = [65, 59, 80, 81, 56, 55, 40];
        datas.forEach((data, index) => {
          dates.push(data.date);
          pts.push(data.pts);
        });
        dataBuild = StatsBuilderService.buildStatsBetsGraph(pts, dates);
      } else {
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(['0'], ['NaN']);
      }

      this.setState({dataDots: dataBuild});
    });
  }

  componentWillReceiveProps(props) {
    const { user } = this.props;
    if (props.user !== user) {
      this.setState(
        {
          dataSetBets: StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['']),
          dataSetCoins: StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['']),
          dataSetEarnings: StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['']),
          dataDots: StatsBuilderService.buildStatsBetsGraph(['100'], ['NaN']),
        },
      );
    }
  }

  render() {
    const { dataSetBets, dataSetCoins, dataSetEarnings, dataDots } = this.state;

    return (
      <div>
        <Container textAlign="center" fluid>
          <Grid>
            <Grid.Row columns={15} divided>
              <Grid.Column textAlign="center" computer={5} tablet={15}>
                <div className="doughnut-container-max-size">
                  <h3>Finished bets per type</h3>
                  <Doughnut data={{ labels: dataSetBets.labels, datasets: dataSetBets.datasets }} legend={{ position: 'bottom' }} />
                </div>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={5} tablet={15}>
                <div className="doughnut-container-max-size">
                  <h3>Bets incomes and losses per types</h3>
                  <Doughnut data={{ labels: dataSetEarnings.labels, datasets: dataSetEarnings.datasets }} legend={{ position: 'bottom' }} />
                </div>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={5} tablet={15}>
                <div className="doughnut-container-max-size">
                  <h3>Coins total usages per purpose</h3>
                  <Doughnut data={{ labels: dataSetCoins.labels, datasets: dataSetCoins.datasets }} legend={{ position: 'bottom' }} />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={16}>
              <Grid.Column textAlign="center" computer={16}>
                <div className="graph-container-max-size">
                  <h3>Earned coins since last reset per day</h3>
                  { /*<Line data={dataDots} fill="false" legend={{position:
                     'bottom'}}/>*/ }
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ProfileStats;
