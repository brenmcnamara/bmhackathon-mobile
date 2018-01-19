/* @flow */

import type { ModelStub } from './types';
import type { Team } from './Team';

export type Game = ModelStub<'Game'> & {
  +away: Team,
  +home: Team,
  +startAt: Date,
  +status: GameStatus,
};

export type GameStatus =
  | {|
      +type: 'NOT_YET_STARTED',
    |}
  | {|
      +type: 'IN_PROGRESS',
    |}
  | {|
      +type: 'COMPLETE',
    |};
