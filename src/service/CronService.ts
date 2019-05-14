import api from '../api';

export default class CronService {
  public static updateCompetitions() {
    return api.post('/cron/competitions');
  }

  public static updateMatches() {
    return api.post('/cron/matches');
  }

  public static updateTeams() {
    return api.post('/cron/teams');
  }
}
