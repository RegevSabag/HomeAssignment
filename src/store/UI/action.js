import { SET_THEME_MODE, SET_MODAL_CONFIRM, SET_MODAL_VIEW } from './constants';


export const setThemeMode = (type) => dispatch =>{
  dispatch({type:SET_THEME_MODE, payload: type});
}

export const toggleModalConfirm = () => dispatch => {
  dispatch({ type:SET_MODAL_CONFIRM });
}

export const toggleModalView = () => dispatch => {
  dispatch({ type:SET_MODAL_VIEW });
}