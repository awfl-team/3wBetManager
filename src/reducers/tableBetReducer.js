import {
  ADD_TABLE_BET, PURGE_TABLE_BET, REMOVE_BET, SET_TABLE_BET,
} from '../actions/TableBetActions';
import Bet from '../model/Bet';

let findIndexBetByMatch;
const bets = (state = [], action) => {
  switch (action.type) {
    case ADD_TABLE_BET:
      // TODO definitely needs refactoring
      if (action.bet) {
        const findIndexBet = state.findIndex(bet => bet.Id === action.bet.Id);
        // update bet
        if (action.inputName === 'Home') action.bet.HomeTeamScore = action.value === '' ? 0 : action.value;
        if (action.inputName === 'Away') action.bet.AwayTeamScore = action.value === '' ? 0 : action.value;


        if (findIndexBet === -1) {
          return [...state, action.bet];
        }

        // update bet
        if (action.inputName === 'Home') state[findIndexBet].HomeTeamScore = action.value === '' ? 0 : action.value;
        if (action.inputName === 'Away') state[findIndexBet].AwayTeamScore = action.value === '' ? 0 : action.value;

        return [...state];
      }
      findIndexBetByMatch = state.findIndex(bet => bet.Match.Id === action.match.Id);

      // new Bet
      if (findIndexBetByMatch === -1) {
        const newBet = new Bet();
        if (action.inputName === 'Home') newBet.HomeTeamScore = action.value;
        if (action.inputName === 'Away') newBet.AwayTeamScore = action.value;
        newBet.Match = action.match;
        return [...state, newBet];
      }

      // update bet
      if (action.inputName === 'Home') state[findIndexBetByMatch].HomeTeamScore = action.value === '' ? 0 : action.value;
      if (action.inputName === 'Away') state[findIndexBetByMatch].AwayTeamScore = action.value === '' ? 0 : action.value;

      return state;
    case PURGE_TABLE_BET:
      return [];
    case REMOVE_BET:
      findIndexBetByMatch = state.findIndex(bet => bet.Match.Id === action.match.Id);
      return [...state.slice(0, findIndexBetByMatch), ...state.slice(findIndexBetByMatch + 1)];
    case SET_TABLE_BET:
      return [...action.bets];
    default:
      return state;
  }
};

export default bets;
