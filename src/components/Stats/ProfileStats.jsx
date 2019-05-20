import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Container, Grid } from 'semantic-ui-react';
import GraphHttpService from '../../httpServices/GraphHttpService';
import StatsBuilderHelper from '../../helpers/StatsBuilderHelper';

let dataBuildBetsPerType;
let dataBuildCoinsPerType;
let dataBuildIncomesAndLoss;
let dataBuildCoinsPerMonth;
let dataBuildCoinsPerYear;

class ProfileStats extends React.Component {
  state = {
    dataSetBets: [],
    dataSetCoins: [],
    dataSetEarnings: [],
    dataSetMonth: [],
    dataSetYear: [],
  };

  componentWillReceiveProps() {
    this.getBetsByTypeData();
    this.getEarningsStatsPerType();
    this.getCoinsStats();
    this.getMonthStats();
    this.getYearStats();
  }

  getBetsByTypeData() {
    GraphHttpService.getBetsByTypeData().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0 && (response.data.wrongBets !== 0
        || response.data.okBets !== 0 || response.data.perfectBets !== 0)) {
        const labels = ['Wrong', 'Ok', 'Perfect'];
        const nbBets = Object.values(datas);
        const colors = ['#DB2828', '#F2711C', '#21BA45'];
        dataBuildBetsPerType = StatsBuilderHelper.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuildBetsPerType = StatsBuilderHelper.buildStatsBetsDougnut(['100'], ['undefined'], ['#000000']);
      }
      this.setState({ dataSetBets: dataBuildBetsPerType });
    });
  }

  getEarningsStatsPerType() {
    GraphHttpService.getEarningsStatsPerType().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0
        && (response.data.okBets !== 0 || response.data.perfectBets !== 0)) {
        const labels = ['Ok', 'Perfect'];
        const nbBets = Object.values(datas);
        const colors = ['#F2711C', '#21BA45'];
        dataBuildCoinsPerType = StatsBuilderHelper.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuildCoinsPerType = StatsBuilderHelper.buildStatsBetsDougnut(['100'], ['undefined'], ['#000000']);
      }
      this.setState({ dataSetEarnings: dataBuildCoinsPerType });
    });
  }

  getCoinsStats() {
    GraphHttpService.getCoinsStats().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0) {
        const labels = ['Coins used to buy items', 'Coins used to bet', 'Bets earnings'];
        const nbBets = Object.values(datas);
        const colors = ['#3949ab', '#d81b60', '#ffa000'];
        dataBuildIncomesAndLoss = StatsBuilderHelper.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuildIncomesAndLoss = StatsBuilderHelper.buildStatsBetsDougnut(['100'], ['undefined'], ['#000000']);
      }
      this.setState({ dataSetCoins: dataBuildIncomesAndLoss });
    });
  }

  getMonthStats() {
    GraphHttpService.getMonthStats().then((resp) => {
      const datas = resp.data;
      const dates = [];
      const pts = [];

      if (resp.data.length > 0) {
        datas.forEach((data) => {
          dates.push(data.Date);
          pts.push(data.Points);
        });
        dataBuildCoinsPerMonth = StatsBuilderHelper.buildStatsBetsGraph(pts, dates);
      } else {
        dataBuildCoinsPerMonth = StatsBuilderHelper.buildStatsBetsDougnut(['0'], ['undefined']);
      }
      this.setState({ dataSetMonth: dataBuildCoinsPerMonth });
    });
  }

  getYearStats() {
    GraphHttpService.getYearStats().then((resp) => {
      const datas = resp.data;
      const dates = [];
      const pts = [];

      if (resp.data.length > 0) {
        datas.forEach((data) => {
          dates.push(data.Date);
          pts.push(data.Points);
        });
        dataBuildCoinsPerYear = StatsBuilderHelper.buildStatsBetsGraph(pts, dates);
      } else {
        dataBuildCoinsPerYear = StatsBuilderHelper.buildStatsBetsDougnut(['0'], ['undefined']);
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

export default ProfileStats;
