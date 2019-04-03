import API from '../api';

export default class GraphService {
  static getGraphData() {
    return API.get('dataLines');
  }

  static getBetsByTypeData() {
    return API.get('stats/type');
  }

  static getEarningsStatsPerType() {
    return API.get('stats/earnings/type');
  }

  static getCoinsStats() {
    return API.get('stats/coins');
  }

  static getMonthStats() {
    return API.get('stats/month');
  }

  static getYearStats() {
    return API.get('stats/year');
  }
}
