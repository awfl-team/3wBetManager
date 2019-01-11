import { SET_USER } from '../actions/UserActions';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
};

export default userReducer;
