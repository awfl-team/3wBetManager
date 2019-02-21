export default class StatsBuilderService {
  static buildStatsBetsByType(aDatas, aLabels, aColors) {
    return {
      datasets: [{
        data: aDatas,
        backgroundColor: aColors,
      }],
      labels: aLabels,
    }
  }
}
