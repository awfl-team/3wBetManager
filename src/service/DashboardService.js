import API from '../api';

export default class DashboardService {
  static getuserDashboard() {
    return API.get('dashboard');
  }
}
