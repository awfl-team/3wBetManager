import API from '../api';
import Bet from '../model/Bet';

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

  // TODO this function might need a little refactor
  static createOrUpdateBet(state, action) {
    if (action.bet) {
      const findIndexBet = state.findIndex(bet => bet.Id === action.bet.Id);
      // update bet
      if (action.inputName === 'home') action.bet.HomeTeamScore = action.value === '' ? 0 : action.value;
      if (action.inputName === 'away') action.bet.AwayTeamScore = action.value === '' ? 0 : action.value;


      if (findIndexBet === -1) {
        return [...state, action.bet];
      }

      // update bet
      if (action.inputName === 'home') state[findIndexBet].HomeTeamScore = action.value === '' ? 0 : action.value;
      if (action.inputName === 'away') state[findIndexBet].AwayTeamScore = action.value === '' ? 0 : action.value;

      return [...state];
    }
    const findIndexBetByMatch = state.findIndex(bet => bet.Match.Id === action.match.Id);

    // new Bet
    if (findIndexBetByMatch === -1) {
      const newBet = new Bet();
      if (action.inputName === 'home') newBet.HomeTeamScore = action.value;
      if (action.inputName === 'away') newBet.AwayTeamScore = action.value;
      newBet.Match = action.match;
      return [...state, newBet];
    }

    // update bet
    if (action.inputName === 'home') state[findIndexBetByMatch].HomeTeamScore = action.value === '' ? 0 : action.value;
    if (action.inputName === 'away') state[findIndexBetByMatch].AwayTeamScore = action.value === '' ? 0 : action.value;

    // remove bet
    if (action.value === '' && state[findIndexBetByMatch].HomeTeamScore === 0 && state[findIndexBetByMatch].AwayTeamScore === 0) {
      return [...state.slice(0, findIndexBetByMatch), ...state.slice(findIndexBetByMatch + 1)];
    }


    return state;
  }
}
