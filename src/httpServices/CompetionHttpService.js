import API from '../api';

export default class CompetitionService {
  static getAllCompetitions() {
    return API.get('competitions');
  }
}
