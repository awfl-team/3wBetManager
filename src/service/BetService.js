import API from '../api';

export default class BetService {
  static getFinishBet(competitionId) {
    return API.get(`bets/${competitionId}/result`);
  }

  static getCurrentBetAndMatches(competitionId) {
    return API.get(`bets/${competitionId}/current`);
  }

  static getFinishBetLimited() {
    return API.get('bets/result');
  }

  static getCurrentBetLimited() {
    return API.get('bets/current');
  }

  static getNbBetsInCompetitionForResult(competitionId) {
    return API.get(`bets/${competitionId}/result/number`);
  }

  static getNbBetsAndMatchesInCompetitionForSubmit(competitionId) {
    return API.get(`bets/${competitionId}/current/number`);
  }

  static getUserFinishedBetsPaginated(page = 1) {
    return API.get(`bets/${page}/result/paginated`);
  }

  static AddOrUpdateBet(bets) {
    const promises = [];
    if (bets.filter(bet => bet.Id === undefined).length > 0) {
      promises.push(API.post('bets', bets.filter(bet => bet.Id === undefined)));
    }

    if (bets.filter(bet => bet.Id !== undefined).length > 0) {
      promises.push(API.put('bets', bets.filter(bet => bet.Id !== undefined)));
    }

    return Promise.all(promises);
  }
}
