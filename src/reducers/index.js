import { combineReducers } from "redux";
import snackbar from "./snackbarReducer";
import bets from "./tableBetReducer";
import taskManager from "./taskManagerReducer";

export default combineReducers({ snackbar, bets, taskManager });
