import { createStore, combineReducers } from 'redux';
import { dealerCards, playerCards, status } from './reducers';


const reducers = {
  status,
  dealerCards,
  playerCards,
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && // hook into browser extension
  window.__REDUX_DEVTOOLS_EXTENSION__()
);