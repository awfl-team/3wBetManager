export const ADD_SNACKBAR = 'ADD_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export function addSnackBar(message, type) {
  return { type: ADD_SNACKBAR, snackbar: { message, type } };
}

export function removeSnackBar() {
  return { type: REMOVE_SNACKBAR };
}
