import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Container, Grid,
} from 'semantic-ui-react';
import GraphService from '../../service/GraphService';
import StatsBuilderService from '../../service/StatsBuilderService';

let dataBuildBetsPerType;
let dataBuildCoinsPerType;
let dataBuildIncomesAndLoss;
let dataBuildCoinsPerMonth;
let dataBuildCoinsPerYear;


class ConsultProfileStats extends React.Component {
  state = {
    dataSetBets: [],
    dataSetCoins: [],
    dataSetEarnings: [],
    dataSetMonth: [],
    dataSetYear: [],
  };

  componentWillReceiveProps() {
    this.getPublicBetsByTypeData(this.props.userId);
    this.getPublicEarningsStatsPerType(this.props.userId);
    this.getPublicCoinsStats(this.props.userId);
    this.getPublicMonthStats(this.props.userId);
    this.getPublicYearStats(this.props.userId);
  }

  getPublicBetsByTypeData(id) {
    GraphService.getPublicBetsByTypeData(id).then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0 && (response.data.wrongBets !== 0
        || response.data.okBets !== 0 || response.data.perfectBets !== 0)) {
        const labels = ['Wrong', 'Ok', 'Perfect'];
        const nbBets = Object.values(datas);
        const colors = ['#DB2828', '#F2711C', '#21BA45'];
        dataBuildBetsPerType = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuildBetsPerType = StatsBuilderService.buildStatsBetsDougnut(['100'], ['undefined'], ['#000000']);
      }
      this.setState({ dataSetBets: dataBuildBetsPerType });
    });
  }

  getPublicEarningsStatsPerType(id) {
    GraphService.getPublicEarningsStatsPerType(id).then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0
        && (response.data.okBets !== 0 || response.data.perfectBets !== 0)) {
        const labels = ['Ok', 'Perfect'];
        const nbBets = Object.values(datas);
        const colors = ['#F2711C', '#21BA45'];
        dataBuildCoinsPerType = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuildCoinsPerType = StatsBuilderService.buildStatsBetsDougnut(['100'], ['undefined'], ['#000000']);
      }
      this.setState({ dataSetEarnings: dataBuildCoinsPerType });
    });
  }

  getPublicCoinsStats(id) {
    GraphService.getPublicCoinsStats(id).then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0) {
        const labels = ['Coins used to buy items', 'Coins used to bet', 'Bets earnings'];
        const nbBets = Object.values(datas);
        const colors = ['#3949ab', '#d81b60', '#ffa000'];
        dataBuildIncomesAndLoss = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuildIncomesAndLoss = StatsBuilderService.buildStatsBetsDougnut(['100'], ['undefined'], ['#000000']);
      }
      this.setState({ dataSetCoins: dataBuildIncomesAndLoss });
    });
  }

  getPublicMonthStats(id) {
    GraphService.getPublicMonthStats(id).then((resp) => {
      const datas = resp.data;
      const dates = [];
      const pts = [];

      if (resp.data.length > 0) {
        datas.forEach((data) => {
          dates.push(data.Date);
          pts.push(data.Points);
        });
        dataBuildCoinsPerMonth = StatsBuilderService.buildStatsBetsGraph(pts, dates);
      } else {
        dataBuildCoinsPerMonth = StatsBuilderService.buildStatsBetsDougnut(['0'], ['undefined']);
      }
      this.setState({ dataSetMonth: dataBuildCoinsPerMonth });
    });
  }

  getPublicYearStats(id) {
    GraphService.getPublicYearStats(id).then((resp) => {
      const datas = resp.data;
      const dates = [];
      const pts = [];

      if (resp.data.length > 0) {
        datas.forEach((data) => {
          dates.push(data.Date);
          pts.push(data.Points);
        });
        dataBuildCoinsPerYear = StatsBuilderService.buildStatsBetsGraph(pts, dates);
      } else {
        dataBuildCoinsPerYear = StatsBuilderService.buildStatsBetsDougnut(['0'], ['undefined']);
      }
      this.setState({ dataSetYear: dataBuildCoinsPerYear });
    });
  }

  render() {
    const {
      dataSetBets, dataSetCoins, dataSetEarnings, dataSetMonth, dataSetYear,
    } = this.state;

    return (
      <div>
        <Container textAlign="center" fluid>
          <Grid>
            <Grid.Row columns={15} divided centered>
              <Grid.Column textAlign="center" computer={5} tablet={15}>
                <div className="doughnut-container-max-size">
                  <h3>Finished bets per type</h3>
                  <Doughnut
                    data={{ labels: dataSetBets.labels, datasets: dataSetBets.datasets }}
                    legend={{ position: 'bottom' }}
                    options={dataSetBets.options}
                  />
                </div>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={5} tablet={15}>
                <div className="doughnut-container-max-size">
                  <h3>Bets incomes and losses per types</h3>
                  <Doughnut
                    data={{ labels: dataSetEarnings.labels, datasets: dataSetEarnings.datasets }}
                    legend={{ position: 'bottom' }}
                    options={dataSetEarnings.options}
                  />
                </div>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={5} tablet={15}>
                <div className="doughnut-container-max-size">
                  <h3>Coins total usages per purpose</h3>
                  <Doughnut
                    data={{ labels: dataSetCoins.labels, datasets: dataSetCoins.datasets }}
                    legend={{ position: 'bottom' }}
                    options={dataSetCoins.options}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={16}>
              <Grid.Column textAlign="center" computer={8} tablet={16}>
                <div className="graph-container-max-size">
                  <h3>Earned coins since last reset per months</h3>
                  <Line
                    data={{ labels: dataSetMonth.labels, datasets: dataSetMonth.datasets }}
                    fill="false"
                    legend={{ position: 'bottom' }}
                    options={dataSetMonth.options}
                  />
                </div>
              </Grid.Column>
              <Grid.Column textAlign="center" computer={8} tablet={16}>
                <div className="graph-container-max-size">
                  <h3>Earned coins since last reset per years</h3>
                  <Bar
                    data={{ labels: dataSetYear.labels, datasets: dataSetYear.datasets }}
                    fill="false"
                    legend={{ position: 'bottom' }}
                    options={dataSetYear.options}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ConsultProfileStats;
