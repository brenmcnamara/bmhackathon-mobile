/* @flow */

import authState from './authState';
import gameState from './gameState';

import { combineReducers } from 'redux';

export default combineReducers({
  authState,
  gameState,
});
