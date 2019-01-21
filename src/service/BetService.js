import API from '../api';

export default class BetService {
  static getFinishBet(competitionId) {
    return API.get(`bets/${competitionId}`);
  }
}
