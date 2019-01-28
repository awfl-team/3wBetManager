export const ADD_TABLE_BET = 'ADD_TABLE_BET';
export const PURGE_TABLE_BET = 'PURGE_TABLE_BET';

export function addTableBet(event, match, inputName) {
  return {
    type: ADD_TABLE_BET, event: { event }, match: { match }, inputName: { inputName },
  };
}

export function purgeTableBet() {
  return { type: PURGE_TABLE_BET };
}
