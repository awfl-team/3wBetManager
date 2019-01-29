import { combineReducers } from 'redux';
import snackbar from "./snackbarReducer";
import bets from "./tableBetReducer";

export default combineReducers({ snackbar, bets });
