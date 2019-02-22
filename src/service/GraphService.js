import API from '../api';

export default class GraphService {
  static getGraphData() {
    return API.get('dataLines');
  }

  static getBetsByTypeData() {
    return API.get('betsPerType');
  }

  static getCoinsStats() {
    return API.get('coinsStats');
  }
}
