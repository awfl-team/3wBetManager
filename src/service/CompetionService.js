import API from '../api';
// TODO create async method
export default class CompetitionService {
  static getAllCompetions() {
    return API.get('competitions');
  }
}
