import API from '../api';

export default class CompetitionService {
  static getAllCompetions() {
    return API.get('competitions');
  }
}
