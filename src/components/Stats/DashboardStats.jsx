import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Button,
} from 'semantic-ui-react';
import GraphService from '../../service/GraphService';
import StatsBuilderService from '../../service/StatsBuilderService';

let dataBuild;

class DashboardStats extends React.Component {
  state = {
    datasetPieGraph: [],
    isDatasetBetsActive: true,
    isDatasetCoinsActive: false,
  };

  componentDidMount() {
    this.loadBetsPerTypeDataset();
  }

  loadBetsPerTypeDataset = () => {
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
      });
    });
  };

  loadCoinsUsageDataset = () => {
    GraphService.getCoinsStats().then((response) => {
      const datas = response.data;

      if (Object.entries(response.data).length > 0) {
        const labels = ['Coins used to bet', 'Bets earnings'];
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
      });
    });
  };

  render() {
    const { datasetPieGraph, isDatasetBetsActive, isDatasetCoinsActive } = this.state;

    return (
      <div>
        <div className="doughnut-container-max-size">
          <Doughnut
            data={{ labels: datasetPieGraph.labels, datasets: datasetPieGraph.datasets }}
            legend={{ position: 'bottom' }}
            options={datasetPieGraph.options}
          />
        </div>
        <div className="ui two buttons">
          <Button.Group fluid>
            <Button
              onClick={this.loadBetsPerTypeDataset}
              active={isDatasetBetsActive}
              primary={isDatasetBetsActive}
            >
              Bets ber type
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
    );
  }
}

export default DashboardStats;
