import api from '../api';

export default class GraphService {
  /* UserToken routes */
  static getBetsByTypeData() {
    return api.get('stats/type');
  }

  static getEarningsStatsPerType() {
    return api.get('stats/earnings/type');
  }

  static getCoinsStats() {
    return api.get('stats/coins');
  }

  static getMonthStats() {
    return api.get('stats/month');
  }

  static getYearStats() {
    return api.get('stats/year');
  }

  /* ConsultUser routes */
  static getPublicBetsByTypeData(id: number) {
    return api.get(`stats/public/type/${id}`);
  }

  static getPublicEarningsStatsPerType(id: number) {
    return api.get(`stats/public/earnings/type/${id}`);
  }

  static getPublicCoinsStats(id: number) {
    return api.get(`stats/public/coins/${id}`);
  }

  static getPublicMonthStats(id: number) {
    return api.get(`stats/public/month/${id}`);
  }

  static getPublicYearStats(id: number) {
    return api.get(`stats/public/year/${id}`);
  }
}
