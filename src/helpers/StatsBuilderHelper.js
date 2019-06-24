export default class StatsBuilderHelper {
  static buildStatsBetsDougnut(aDatas, aLabels, aColors) {
    return {
      datasets: [{
        data: aDatas,
        backgroundColor: aColors,
      }],
      labels: aLabels,
      options: {
        legend: {
          labels: {
            fontColor: 'white',
          },
          position: 'bottom',
        },
      },
    };
  }

  static buildStatsBetsGraph(aDatas, aLabels) {
    return {
      datasets: [{
        data: aDatas,
        backgroundColor: '#ffbe14',
        borderColor: '#ffbe14',
        fill: false,
        label: 'Earned coins',
      }],
      labels: aLabels,
      options: {
        legend: {
          labels: {
            fontColor: 'white',
          },
          position: 'bottom',
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: 'white',
            },
          }],
          xAxes: [{
            ticks: {
              fontColor: 'white',
            },
          }],
        },
      },
    };
  }
}
