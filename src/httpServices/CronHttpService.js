import API from '../api';

export default class CronHttpService {
  static updateCompetitions() {
    return API.post('/cron/competitions');
  }

  static updateMatches() {
    return API.post('/cron/matches');
  }

  static updateTeams() {
    return API.post('/cron/teams');
  }
}
