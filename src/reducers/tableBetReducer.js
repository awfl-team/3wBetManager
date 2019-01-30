import { ADD_TABLE_BET, PURGE_TABLE_BET } from '../actions/TableBetActions';
import BetService from '../service/BetService';


const bets = (state = [], action) => {
  switch (action.type) {
    case ADD_TABLE_BET:
      return BetService.createOrUpdateBet(state, action);
      // return [...state, action.bet];
    case PURGE_TABLE_BET:
      return [];
    default:
      return state;
  }
};

export default bets;
