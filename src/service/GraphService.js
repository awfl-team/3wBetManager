import API from '../api';

export default class GraphService {
  static getGraphData() {
    return API.get('dataLines');
  }

  static getBetsByTypeData() {
    return API.get('stats/type');
  }

  static getCoinsStats() {
    return API.get('stats/coins');
  }
}
