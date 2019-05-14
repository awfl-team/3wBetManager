import api from '../api';

export default class CompetitionService {
  public static getAllCompetitions() {
    return api.get('competitions');
  }
}
