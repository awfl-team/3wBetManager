import { combineReducers } from 'redux';
import snackbar from './snackbarReducer';
import bets from './tableBetReducer';
import taskManager from './taskManagerReducer';
import skeleton from './skeletonReducer';

export default combineReducers({
  snackbar, bets, taskManager, skeleton,
});
