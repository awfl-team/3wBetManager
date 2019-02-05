import API from '../api';
import Bet from '../model/Bet';

export default class BetService {
  static getFinishBet(competitionId) {
    return API.get(`bets/${competitionId}/result`);
  }

  static getCurrentBetAndMatches(competitionId) {
    return API.get(`bets/${competitionId}/current`);
  }

  static getNbBetsInCompetitionForResult(competitionId) {
    return API.get(`bets/${competitionId}/result/number`);
  }

  static getNbBetsAndMatchesInCompetitionForSubmit(competitionId) {
    return API.get(`bets/${competitionId}/current/number`);
  }

  static AddOrUpdateBet(bets) {
    return API.post('bets', bets);
  }

  static createOrUpdateBet(state, action) {
    const findIndexBet = state.findIndex(bet => bet.Match.Id === action.match.Id);

    // new Bet
    if (findIndexBet === -1) {
      const newBet = new Bet();
      if (action.inputName === 'home') newBet.HomeTeamScore = action.value;
      if (action.inputName === 'away') newBet.AwayTeamScore = action.value;
      newBet.Match = action.match;
      return [...state, newBet];
    }
    // remove bet
    if (action.value === '' && state[findIndexBet].HomeTeamScore === 0 && state[findIndexBet].AwayTeamScore === 0) {
      return [...state.slice(0, findIndexBet), ...state.slice(findIndexBet + 1)];
    }

    // update bet
    if (action.inputName === 'home') state[findIndexBet].HomeTeamScore = action.value === '' ? 0 : action.value;
    if (action.inputName === 'away') state[findIndexBet].AwayTeamScore = action.value === '' ? 0 : action.value;


    return state;
  }
}
