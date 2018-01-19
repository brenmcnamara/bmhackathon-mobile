/* @flow */

import type { Game } from '../models/Game';
import type { PureAction } from '../store';

export type State = null | {
  +game: Game,
};

const DEFAULT_STATE = null;

export default function selectedGame(
  state: State = DEFAULT_STATE,
  action: PureAction,
): State {
  return state;
}
