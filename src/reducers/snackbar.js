import {ADD_SNACKBAR} from "../actions/SnackBarActions";


const snackbars = (state = [], action) => {
    switch (action.type) {
        case ADD_SNACKBAR:
            return [
                ...state,
                {
                    message: action.snackbar.message,
                    type: action.snackbar.type
                }
            ]
        default:
            return state;
    }
};

export default snackbars;
