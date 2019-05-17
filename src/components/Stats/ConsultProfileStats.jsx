import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Container, Grid } from 'semantic-ui-react';
import GraphService from '../../service/GraphService';
import StatsBuilderService from '../../service/StatsBuilderService';
import PieStatSkeleton from '../SkeletonLoaders/PieStatSkeleton';
import GraphStatSkeleton from '../SkeletonLoaders/GraphStatSkeleton';
import GraphPointsStatSkeleton from '../SkeletonLoaders/GraphPointsStatSkeleton';

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
    isBetsLoading: true,
    isCoinsLoading: true,
    isEarningsLoading: true,
    isMonthLoading: true,
    isYearLoading: true,
  };

  componentDidMount() {
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
      this.setState({
        dataSetBets: dataBuildBetsPerType,
        isBetsLoading: false,
      });
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
      this.setState({
        dataSetEarnings: dataBuildCoinsPerType,
        isEarningsLoading: false,
      });
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
      this.setState({
        dataSetCoins: dataBuildIncomesAndLoss,
        isCoinsLoading: false,
      });
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
        dataBuildCoinsPerMonth = StatsBuilderService.buildStatsBetsGraph(['0'], ['undefined']);
      }
      this.setState({
        dataSetMonth: dataBuildCoinsPerMonth,
        isMonthLoading: false,
      });
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
      this.setState({
        dataSetYear: dataBuildCoinsPerYear,
        isYearLoading: false,
      });
    });
  }

  render() {
    const {
      dataSetBets, dataSetCoins, dataSetEarnings, dataSetMonth, dataSetYear,
      isBetsLoading, isCoinsLoading, isEarningsLoading, isMonthLoading, isYearLoading,
    } = this.state;

    return (
      <div>
        <Container textAlign="center" fluid>
          <Grid>
            <Grid.Row columns={15} divided centered>
              <Grid.Column textAlign="center" computer={5} tablet={15}>
                { isBetsLoading ? (
                  <PieStatSkeleton />
                ) : (
                  <div className="doughnut-container-max-size">
                    <h3>Finished bets per type</h3>
                    <Doughnut
                      data={{ labels: dataSetBets.labels, datasets: dataSetBets.datasets }}
                      options={{ legend: dataSetBets.options.legend }}
                    />
                  </div>
                )
                }
              </Grid.Column>
              <Grid.Column textAlign="center" computer={5} tablet={15}>
                { isEarningsLoading ? (
                  <PieStatSkeleton />
                ) : (
                  <div className="doughnut-container-max-size">
                    <h3>Bets incomes and losses per types</h3>
                    <Doughnut
                      data={{ labels: dataSetEarnings.labels, datasets: dataSetEarnings.datasets }}
                      options={{ legend: dataSetEarnings.options.legend }}
                    />
                  </div>
                )
                }
              </Grid.Column>
              <Grid.Column textAlign="center" computer={5} tablet={15}>
                { isCoinsLoading ? (
                  <PieStatSkeleton />
                ) : (
                  <div className="doughnut-container-max-size">
                    <h3>Coins total usages per purpose</h3>
                    <Doughnut
                      data={{ labels: dataSetCoins.labels, datasets: dataSetCoins.datasets }}
                      options={{ legend: dataSetCoins.options.legend }}
                    />
                  </div>
                )
                }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={16}>
              <Grid.Column textAlign="center" computer={8} tablet={16}>
                { isMonthLoading ? (
                  <GraphPointsStatSkeleton />
                ) : (
                  <div className="graph-container-max-size">
                    <h3>Earned coins since last reset per months</h3>
                    <Line
                      data={{ labels: dataSetMonth.labels, datasets: dataSetMonth.datasets }}
                      fill="false"
                      options={{
                        legend: dataSetMonth.options.legend,
                        scales: dataSetMonth.options.scales,
                      }}
                    />
                  </div>
                )
                }
              </Grid.Column>
              <Grid.Column textAlign="center" computer={8} tablet={16}>
                { isYearLoading ? (
                  <GraphStatSkeleton />
                ) : (
                  <div className="graph-container-max-size">
                    <h3>Earned coins since last reset per years</h3>
                    <Bar
                      data={{ labels: dataSetYear.labels, datasets: dataSetYear.datasets }}
                      fill="false"
                      options={{
                        legend: dataSetYear.options.legend,
                        scales: dataSetYear.options.scales,
                      }}
                    />
                  </div>
                )
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ConsultProfileStats;
