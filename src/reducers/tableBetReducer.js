import { ADD_TABLE_BET, PURGE_TABLE_BET, SET_TABLE_BET } from "../actions/TableBetActions";
import Bet from "../model/Bet";

let findIndexBetByMatch;
const bets = (state = [], action) => {
  switch (action.type) {
    case ADD_TABLE_BET:
      if (action.bet) {
        const findIndexBet = state.findIndex(bet => bet.Id === action.bet.Id);
        // update bet
        if (action.inputName === "home") { action.bet.HomeTeamScore = action.value === "" ? 0 : action.value; }
        if (action.inputName === "away") { action.bet.AwayTeamScore = action.value === "" ? 0 : action.value; }

        if (findIndexBet === -1) {
          return [...state, action.bet];
        }

        // update bet
        if (action.inputName === "home") { state[findIndexBet].HomeTeamScore = action.value === "" ? 0 : action.value; }
        if (action.inputName === "away") { state[findIndexBet].AwayTeamScore = action.value === "" ? 0 : action.value; }

        return [...state];
      }
      findIndexBetByMatch = state.findIndex(bet => bet.Match.Id === action.match.Id);

      // new Bet
      if (findIndexBetByMatch === -1) {
        const newBet = new Bet();
        if (action.inputName === "home") { newBet.HomeTeamScore = action.value; }
        if (action.inputName === "away") { newBet.AwayTeamScore = action.value; }
        newBet.Match = action.match;
        return [...state, newBet];
      }

      // update bet
      if (action.inputName === "home") { state[findIndexBetByMatch].HomeTeamScore = action.value === "" ? 0 : action.value; }
      if (action.inputName === "away") { state[findIndexBetByMatch].AwayTeamScore = action.value === "" ? 0 : action.value; }

      // remove bet
      if (action.value === "" && state[findIndexBetByMatch].HomeTeamScore === 0 && state[findIndexBetByMatch].AwayTeamScore === 0) {
        return [...state.slice(0, findIndexBetByMatch), ...state.slice(findIndexBetByMatch + 1)];
      }

      return state;
    case PURGE_TABLE_BET:
      return [];
    case SET_TABLE_BET:
      return [...action.bets];
    default:
      return state;
  }
};

export default bets;
