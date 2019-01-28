export const ADD_TABLE_BET = 'ADD_TABLE_BET';
export const PURGE_TABLE_BET = 'PURGE_TABLE_BET';

export function addTableBet(bet) {
  return { type: ADD_TABLE_BET, bet: { bet } };
}

export function purgeTableBet() {
  return { type: PURGE_TABLE_BET };
}
