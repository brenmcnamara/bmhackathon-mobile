/* @flow */

import authState from './authState';
import selectedGame from './selectedGame';

import { combineReducers } from 'redux';

export default combineReducers({
  authState,
  selectedGame,
});
