/* @flow */

import type { Game } from '../models/Game';

export type Action =
  | Action$SelectGame
  | Action$RemoveGame
  | Action$UpsertActiveSubmission;

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

type Action$UpsertActiveSubmission = {|
  +submission: Submission,
  +type: 'UPSERT_ACTIVE_SUBMISSION',
|};

export function upsertActiveSubmission(submission: Submission) {
  return {
    submission,
    type: 'UPSERT_ACTIVE_SUBMISSION',
  };
}
