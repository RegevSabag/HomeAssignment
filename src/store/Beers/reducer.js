import { SET_FAVORITES, SET_ITEMS, SET_LOADING_INDICATOR, SET_LOADING_INDICATOR_FETCH_MORE } from "./constants";

const initialState = {
  items: [],
  favorites: {},
  loadingIndicator: false,
  loadingIndicatorFetchMore: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      }
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload
      }
    case SET_LOADING_INDICATOR:
      return {
        ...state,
        loadingIndicator: action.payload
      }
    case SET_LOADING_INDICATOR_FETCH_MORE:
      return {
        ...state,
        loadingIndicatorFetchMore: action.payload
      }
    default:
      return state;
  }
};
