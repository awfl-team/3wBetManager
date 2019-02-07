import API from '../api';

export default class CronService {
  static updateCompetitions() {
    return API.get('/cron/competitions');
  }

  static updateMatches() {
    return API.get('/cron/matches');
  }

  static updateTeams() {
    return API.get('/cron/teams');
  }

  static updateAll() {
    return API.get('/cron/all');
  }
}
