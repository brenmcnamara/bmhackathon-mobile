/* @flow */

import type { Game } from '../models/Game';

export type Action = Action$SelectGame | Action$RemoveGame;

type Action$SelectGame = {|
  +game: Game,
  +type: 'SELECT_GAME',
|};

export function selectGame(game: Game) {
  return { game, type: 'SELECT_GAME' };
}

type Action$RemoveGame = {|
  +type: 'REMOVE_GAME',
|};

export function removeGame() {
  return { type: 'REMOVE_GAME' };
}
