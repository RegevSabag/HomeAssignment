import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// Reducers
import snackBarReducer from './SnackBar/reducer';
import UIReducer from './UI/reducer';
import beersReducer from './Beers/reducer';

const initionState = {};
const middleware = [thunk];
const rootReducer =  combineReducers({
  snackBar: snackBarReducer,
  beers: beersReducer,
  UI: UIReducer
});

const store = createStore(rootReducer,initionState, applyMiddleware(...middleware));

export default store;
