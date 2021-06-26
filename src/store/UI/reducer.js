import { SET_THEME_MODE, SET_MODAL_CONFIRM, SET_MODAL_VIEW } from "./constants";

const initialState = {
  themeMode: 'dark',
  modalConfirm: false,
  modalView: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME_MODE:
      return {
        ...state,
        themeMode: action.payload
      }
    case SET_MODAL_CONFIRM:
      return {
        ...state,
        modalConfirm: !state.modalConfirm
      }
    case SET_MODAL_VIEW:
      return {
        ...state,
        modalView: !state.modalView
      }
    default:
      return state;
  }
};
