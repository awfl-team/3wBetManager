export const ADD_SNACKBAR = 'ADD_SNACKBAR';

export function addSnackBar(message, type) {
    return {type: ADD_SNACKBAR, snackbar: {message, type}}
}
