/* @flow */

import activeQuestion from '../middleware/activeQuestion';
import auth from '../middleware/auth';
import game from '../middleware/game';
import root from '../reducers/root';

import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import type { Action as Action$ActiveQuestion } from '../middleware/activeQuestion';
import type { Action as Action$Auth } from '../actions/auth';
import type { Action as Action$AuthMiddleware } from '../middleware/auth';
import type { Action as Action$Game } from '../actions/game';
import type { Action as Action$GameMiddleware } from '../middleware/game';
import type { Action as Action$LeaderBoard } from '../actions/leaderBoard';
import type { State as State$AuthState } from '../reducers/authState';
import type { State as State$GameState } from '../reducers/gameState';
import type { State as State$LeaderBoard } from '../reducers/leaderBoard';

export type PureAction =
  | Action$ActiveQuestion
  | Action$Auth
  | Action$AuthMiddleware
  | Action$Game
  | Action$GameMiddleware
  | Action$LeaderBoard;

export type Action = PureAction;
export type ReduxStore = {
  getState: () => State,
};

export type State = {
  +authState: State$AuthState,
  +gameState: State$GameState,
  +leaderBoard: State$LeaderBoard,
};

const middleware = applyMiddleware(
  auth,
  game,
  activeQuestion,
  createLogger({ collapsed: true }),
);

export default createStore(root, middleware);
