/* @flow */

import auth from '../middleware/auth';
import root from '../reducers/root';

import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import type { Action as Action$Auth } from '../actions/auth';
import type { Action as Action$AuthMiddleware } from '../middleware/auth';
import type { State as State$AuthState } from '../reducers/authState';
import type { State as State$GameState } from '../reducers/gameState';

export type PureAction = Action$Auth | Action$AuthMiddleware;
export type Action = PureAction;
export type ReduxStore = {
  getState: () => State,
};

export type State = {
  +authState: State$AuthState,
  +gameState: State$GameState,
};

const middleware = applyMiddleware(auth, createLogger({ collapsed: true }));

export default createStore(root, middleware);
