import API from '../api';

export default class GraphService {
  /* UserToken routes */
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

  /* ConsultUser routes */
  static getPublicBetsByTypeData(id) {
    return API.get(`stats/public/type/${id}`);
  }

  static getPublicEarningsStatsPerType(id) {
    return API.get(`stats/public/earnings/type/${id}`);
  }

  static getPublicCoinsStats(id) {
    return API.get(`stats/public/coins/${id}`);
  }

  static getPublicMonthStats(id) {
    return API.get(`stats/public/month/${id}`);
  }

  static getPublicYearStats(id) {
    return API.get(`stats/public/year/${id}`);
  }
}
