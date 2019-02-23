import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {
  Button
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

  // @todo Refactor stats of consultProfile and profile as a component
  // @todo Must have a user given. Consult profile must have a user. Profile must have current user.

  componentWillMount() {
    this.loadBetsPerTypeDataset();
  }

  loadBetsPerTypeDataset = () => {
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
      this.setState({datasetPieGraph: dataBuild,
        isDatasetBetsActive: true,
        isDatasetCoinsActive: false,
      });
    });
  };

  loadCoinsUsageDataset = () => {
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
      this.setState({datasetPieGraph: dataBuild,
        isDatasetBetsActive: false,
        isDatasetCoinsActive: true,
      });
    });
  }

  render() {
    const { datasetPieGraph, isDatasetBetsActive, isDatasetCoinsActive } = this.state;

    return (
      <div>
        <div className="doughnut-container-max-size">
          <Doughnut data={{labels: datasetPieGraph.labels, datasets: datasetPieGraph.datasets}} legend={{position: 'bottom'}}/>
        </div>
        {/* @todo buttons to switch between 2 datasets ?? betsPerType and ??? */}
        <div className="ui two buttons">
          <Button.Group fluid>
            <Button onClick={this.loadBetsPerTypeDataset} active={isDatasetBetsActive} primary={isDatasetBetsActive}>Bets</Button>
            <Button.Or />
            <Button onClick={this.loadCoinsUsageDataset} active={isDatasetCoinsActive} primary={isDatasetCoinsActive}>Coins</Button>
          </Button.Group>
        </div>
      </div>
    );
  }
}

export default DashboardStats;
