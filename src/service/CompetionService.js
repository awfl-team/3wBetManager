import API from '../api';
// TODO create async method
export default class CompetitionService {
  static getAllCompetitions() {
    return API.get('competitions');
  }
}
