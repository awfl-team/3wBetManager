import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import DashboardService from '../../service/DashboardService';

const data = {
  labels: [
    'Failed bets',
    'Won bets',
    'perfect bets',
  ],
  datasets: [
    {
      data: [],
      backgroundColor: [
        '#FF6384',
        '#FFCE56',
        '#21BA45',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#FFCE56',
        '#21BA45',
      ],
    }],
};

class Dashboard extends React.Component {
  componentWillMount() {
    DashboardService.getuserDashboard().then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <div className="ui container">
        <h1>Dashboard</h1>
        <Doughnut width={3000} data={data} />
      </div>
    );
  }
}

export default Dashboard;
