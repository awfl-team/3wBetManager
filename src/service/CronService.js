import API from '../api';
// TODO create async method
export default class CronService {
  static updateCompetitions() {
    return API.post('/cron/competitions');
  }

  static updateMatches() {
    return API.post('/cron/matches');
  }

  static updateTeams() {
    return API.post('/cron/teams');
  }

  static updateAll() {
    return API.post('/cron/all');
  }
}