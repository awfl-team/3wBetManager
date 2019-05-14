import api from '../api';
import Bet from '../model/Bet';

export default class BetService {
  static getFinishBet(competitionId: number) {
    return api.get(`bets/${competitionId}/result`);
  }

  static getCurrentBetAndMatches(competitionId: number) {
    return api.get(`bets/${competitionId}/current`);
  }

  static getFinishBetLimited() {
    return api.get('bets/result');
  }

  static getCurrentBetLimited() {
    return api.get('bets/current');
  }

  static getFinishBetLimitedWithKey(userId: number) {
    return api.get(`bets/${userId}/result/key`);
  }

  static getCurrentBetLimitedWithKey(userId: number) {
    return api.get(`bets/${userId}/current/key`);
  }

  static getNbBetsInCompetitionForResult(competitionId: number) {
    return api.get(`bets/${competitionId}/result/number`);
  }

  static getNbBetsAndMatchesInCompetitionForSubmit(competitionId: number) {
    return api.get(`bets/${competitionId}/current/number`);
  }

  static getUserFinishedBetsPaginated(page: number = 1) {
    return api.get(`bets/${page}/result/paginated`);
  }

  static addOrUpdateBet(bets: Bet[]) {
    const promises = [];
    if (bets.filter(bet => bet.Id === undefined).length > 0) {
      promises.push(api.post('bets', bets.filter(bet => bet.Id === undefined)));
    }

    if (bets.filter(bet => bet.Id !== undefined).length > 0) {
      promises.push(api.put('bets', bets.filter(bet => bet.Id !== undefined)));
    }

    return Promise.all(promises);
  }
}
