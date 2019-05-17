import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Button } from 'semantic-ui-react';
import GraphService from '../../service/GraphService';
import StatsBuilderService from '../../service/StatsBuilderService';
import DashboardStatSkeleton from '../SkeletonLoaders/DashboardStatSkeleton';

let dataBuild;

class DashboardStats extends React.Component {
  state = {
    datasetPieGraph: [],
    isDatasetBetsActive: true,
    isDatasetCoinsActive: false,
    isLoading: true,
  };

  componentDidMount() {
    this.loadBetsPerTypeDataset();
  }

  loadBetsPerTypeDataset = () => {
    this.setState({ isLoading: true });
    GraphService.getBetsByTypeData().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0 && (response.data.wrongBets !== 0
          || response.data.okBets !== 0 || response.data.perfectBets !== 0)) {
        const labels = ['Wrong', 'Ok', 'Perfect'];
        const nbBets = Object.values(datas);
        const colors = ['#DB2828', '#F2711C', '#21BA45'];
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['#000000']);
      }
      this.setState({
        datasetPieGraph: dataBuild,
        isDatasetBetsActive: true,
        isDatasetCoinsActive: false,
        isLoading: false,
      });
    });
  };

  loadCoinsUsageDataset = () => {
    this.setState({ isLoading: true });
    GraphService.getCoinsStats().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0) {
        const labels = ['Coins used to buy items', 'Coins used to bet', 'Bets earnings'];
        const nbBets = Object.values(datas);
        const colors = ['#3949ab', '#d81b60', '#ffa000'];
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(nbBets, labels, colors);
      } else {
        dataBuild = StatsBuilderService.buildStatsBetsDougnut(['100'], ['NaN'], ['#000000']);
      }
      this.setState({
        datasetPieGraph: dataBuild,
        isDatasetBetsActive: false,
        isDatasetCoinsActive: true,
        isLoading: false,
      });
    });
  };

  render() {
    const {
      datasetPieGraph, isDatasetBetsActive,
      isDatasetCoinsActive, isLoading,
    } = this.state;

    return (
      <div>
        { isLoading ? (
          <DashboardStatSkeleton />
        ) : (
          <div>
            <div className="doughnut-container-max-size">
              <Doughnut
                data={{ labels: datasetPieGraph.labels, datasets: datasetPieGraph.datasets }}
                options={{ legend: datasetPieGraph.options.legend }}
              />
            </div>
            <div className="ui two buttons">
              <Button.Group fluid>
                <Button
                  onClick={this.loadBetsPerTypeDataset}
                  active={isDatasetBetsActive}
                  primary={isDatasetBetsActive}
                >
                  Bets per type
                </Button>
                <Button.Or />
                <Button
                  onClick={this.loadCoinsUsageDataset}
                  active={isDatasetCoinsActive}
                  primary={isDatasetCoinsActive}
                >
                  Coins usage
                </Button>
              </Button.Group>
            </div>
          </div>
        )
        }
      </div>
    );
  }
}

export default DashboardStats;
