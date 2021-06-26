import axios from 'axios';
import { SET_ITEMS, SET_FAVORITES, SET_LOADING_INDICATOR_FETCH_MORE, SET_LOADING_INDICATOR } from "./constants"
import { BASE_URL, END_POINT } from '../../utils';
import * as actionsSnackBar from '../SnackBar/action';


export const toggleItemFavorite = (item) => (dispatch, getState) => {
  const favorites = getState().beers.favorites;
  if(favorites[item.id]){
    delete favorites[item.id];
    dispatch({type: SET_FAVORITES, payload: {...favorites}});
  } else {
    favorites[item.id] = {...item, rank:"" };
    dispatch({type: SET_FAVORITES, payload: {...favorites } });
  }
};

export const setRankToFavoriteBeer = (itemId, value) => (dispatch, getState) => {
  const favorites = getState().beers.favorites;
  favorites[itemId]['rank'] = value;
  dispatch({type: SET_FAVORITES, payload: {...favorites}});
};

export const removeAllFavorites = () => (dispatch) => {
  dispatch({type: SET_FAVORITES, payload: {} })
};

export const fetchItems = (page, searchKey = null, setHasMoreItems) => async (dispatch, getState) => {
  try { 
    setHasMoreItems(true);
    const items = getState().beers.items;
    if(page === 1){
      dispatch({type:SET_LOADING_INDICATOR, payload:true});
    } else { 
      dispatch({type:SET_LOADING_INDICATOR_FETCH_MORE, payload:true});
    }
    //setTimeout( async () => {
      const response = await axios.get(`${BASE_URL}${END_POINT.BEERS}?page=${page}&per_page=12${searchKey ?'&food='+searchKey :''}`)
      if(response.data.length === 0){
        setHasMoreItems(false);
      }
      if(page === 1){
        dispatch({type: SET_ITEMS, payload:  response.data});
        dispatch({type:SET_LOADING_INDICATOR, payload:false});
      } else {
        dispatch({type: SET_ITEMS, payload: [...items, ...response.data]});
        dispatch({type:SET_LOADING_INDICATOR_FETCH_MORE, payload:false});
      } 
    //}, 2000);
  } catch(error) {
    console.log(error);
    dispatch(actionsSnackBar.setSnackBar('error', 'server error'));
    dispatch({type:SET_LOADING_INDICATOR, payload:false});
    dispatch({type:SET_LOADING_INDICATOR_FETCH_MORE, payload:false});
  }
};