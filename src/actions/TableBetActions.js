export const ADD_TABLE_BET = 'ADD_TABLE_BET';
export const PURGE_TABLE_BET = 'PURGE_TABLE_BET';

export function addTableBet(match, inputName, value, bet) {
  return {
    type: ADD_TABLE_BET, value, match, inputName, bet,
  };
}

export function purgeTableBet() {
  return { type: PURGE_TABLE_BET };
}
