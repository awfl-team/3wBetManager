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
        backgroundColor: '#ffbe14',
        borderColor: '#ffbe14',
        fill: false,
        label: 'Earned coins',
      }],
      labels: aLabels,
    }
  }
}
