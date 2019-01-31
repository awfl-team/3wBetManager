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
    console.log(action);
    const findIndexBet = state.findIndex(bet => bet.Match.Id === action.match.Id);
    if (findIndexBet === -1) {
      const newBet = new Bet();
      if (action.inputName === 'home') newBet.HomeTeamScore = action.value;
      if (action.inputName === 'away') newBet.AwayTeamScore = action.value;
      newBet.Match = action.match;
      return [...state, newBet];
    }
    if (action.inputName === 'home') state[findIndexBet].HomeTeamScore = action.value;
    if (action.inputName === 'away') state[findIndexBet].AwayTeamScore = action.value;


    return state;
  }
}
