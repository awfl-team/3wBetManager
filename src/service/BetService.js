import API from '../api';
import Bet from '../model/Bet';

export default class BetService {
  static getFinishBet(competitionId) {
    return API.get(`bets/${competitionId}/result`);
  }

  static getCurrentBetAndMatches(competitionId) {
    return API.get(`bets/${competitionId}/current`);
  }

  static AddOrUpdateBet(bets) {
    return API.post('bets', bets);
  }

  static ParseBetList(bets) {
    bets.forEach((bet, index) => {
      if (bet.HomeTeamScore === '' || bet.AwayTeamScore === ''
          || bet.HomeTeamScore === undefined || bet.AwayTeamScore === undefined) {
        bets.splice(index, 1);
      }
    });
    return bets;
  }


  static createOrUpdateBet(state, action) {
    const findIndexBet = state.findIndex(bet => bet.Match.Id === action.match.match.Id);
    if (findIndexBet === -1) {
      const newBet = new Bet();
      if (action.inputName.inputName === 'home') newBet.HomeTeamScore = action.value.value;
      if (action.inputName.inputName === 'away') newBet.AwayTeamScore = action.value.value;
      newBet.Match = action.match.match;
      return [...state, newBet];
    }
    if (action.inputName.inputName === 'home') state[findIndexBet].HomeTeamScore = action.value.value;
    if (action.inputName.inputName === 'away') state[findIndexBet].AwayTeamScore = action.value.value;

    return state;
  }
}
