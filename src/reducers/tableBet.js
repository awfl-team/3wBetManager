import { ADD_TABLE_BET, PURGE_TABLE_BET } from '../actions/TableBet';

const bets = (state = [], action) => {
  switch (action.type) {
    case ADD_TABLE_BET:
      return [...state, action.bet];
    case PURGE_TABLE_BET:
      return [];
    default:
      return state;
  }
};

export default bets;
