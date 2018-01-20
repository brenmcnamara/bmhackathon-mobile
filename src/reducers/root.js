/* @flow */

import authState from './authState';
import gameState from './gameState';
import leaderBoard from './leaderBoard';

import { combineReducers } from 'redux';

export default combineReducers({
  authState,
  gameState,
  leaderBoard,
});
