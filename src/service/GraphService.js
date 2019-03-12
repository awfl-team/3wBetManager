import API from '../api';

export default class GraphService {
  static getGraphData() {
    return API.get('dataLines');
  }

  static getBetsByTypeData() {
    return API.get('bets/stats/type');
  }

  static getEarningsStatsPerType() {
    return API.get('bets/stats/earnings/type');
  }

  static getCoinsStats() {
    return API.get('users/stats/coins');
  }

  static getMonthStats() {
    return API.get('users/stats/month');
  }
}
