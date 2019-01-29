import API from '../api';
import Bet from '../model/Bet';

export default class BetService {
  static getFinishBet(competitionId) {
    return API.get(`bets/${competitionId}/result`);
  }

  static getCurrentBetAndMatches(competitionId) {
    return API.get(`bets/${competitionId}/current`);
  }

  static createOrUpdateBet(state, action) {
    const findIndexBet = state.findIndex(bet => bet.Match.Id === action.match.Id);
    if (findIndexBet === -1) {
      const newBet = new Bet();
      if (action.inputName === 'home') newBet.HomeTeamScore = action.event.target.value;
      if (action.inputName === 'away') newBet.AwayTeamScore = action.event.target.value;
      newBet.Match = action.match;
      return [...state, newBet];
    }
    if (action.inputName === 'home') state[findIndexBet].HomeTeamScore = action.event.target.value;
    if (action.inputName === 'away') state[findIndexBet].AwayTeamScore = action.event.target.value;

    return state;
  }
}
