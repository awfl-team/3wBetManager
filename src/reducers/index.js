import { combineReducers } from 'redux';
import snackbar from './snackbar';
import bets from './tableBet';

export default combineReducers({ snackbar, bets });
