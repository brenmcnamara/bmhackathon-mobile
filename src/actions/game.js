/* @flow */

import type { Game } from '../models/Game';

export type Action =
  | Action$SelectGame
  | Action$RemoveGame
  | Action$UpsertSubmission;

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

type Action$UpsertSubmission = {|
  +submission: Submission,
  +type: 'UPSERT_SUBMISSION',
|};

export function upsertSubmission(submission: Submission) {
  return {
    submission,
    type: 'UPSERT_SUBMISSION',
  };
}
