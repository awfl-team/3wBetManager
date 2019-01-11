import { combineReducers } from 'redux';
import snackBarReducer from './snackBarReducer';
import userReducer from './userReducer';

export default combineReducers({ snackbar: snackBarReducer, user: userReducer });
