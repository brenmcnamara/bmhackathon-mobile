/* @flow */

import type { Game } from '../models/Game';
import type { PureAction } from '../store';

export type State = {
  +game: Game | null,
};

const DEFAULT_STATE = { game: null };

export default function gameState(
  state: State = DEFAULT_STATE,
  action: PureAction,
): State {
  switch (action.type) {
    case 'SELECT_GAME': {
      return { ...state, game: action.game };
    }

    case 'REMOVE_GAME': {
      return { ...state, game: null };
    }
  }
  return state;
}
