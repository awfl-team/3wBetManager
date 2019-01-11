import {ADD_SNACKBAR, REMOVE_SNACKBAR} from '../actions/SnackBarActions';

const snackbar = (state = null, action) => {
  switch (action.type) {
    case ADD_SNACKBAR:
      return Object.assign({}, state,
        {
          message: action.snackbar.message,
          type   : action.snackbar.type,
        },
      );
    case REMOVE_SNACKBAR:
      return null;
    default:
      return state;
  }
};

export default snackbar;
