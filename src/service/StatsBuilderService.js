export default class StatsBuilderService {
  static buildStatsBetsDougnut(aDatas, aLabels, aColors) {
    return {
      datasets: [{
        data: aDatas,
        backgroundColor: aColors,
      }],
      labels: aLabels,
    }
  }

  static buildStatsBetsGraph(aDatas, aLabels) {
    return {
      datasets: [{
        data: aDatas,
        backgroundColor: '#124567',
        borderColor: '#124567',
        fill: false,
        label: 'Earned coins',
      }],
      labels: aLabels,
    }
  }
}
