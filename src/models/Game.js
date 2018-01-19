/* @flow */

import Firebase from 'react-native-firebase';

import type { ID, ModelStub } from './types';
import type { TeamName } from './Team';

export type Game = ModelStub<'Game'> & {
  +away: TeamName,
  +awayScore: number,
  +gameStartAt: Date,
  +home: TeamName,
  +homeScore: number,
  +status: GameStatus,
  +timer: GameTimer,
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

export type GameTimer = {|
  +startAt: Date,
  +type: 'FIRST_HALF' | 'SECOND_HALF',
|};

export function genFetchGame(id: ID): Promise<Game | null> {
  return Promise.resolve().then(() =>
    Firebase.firestore()
      .collection('Game')
      .doc(id)
      .get()
      .then(doc => (doc.exists ? doc.data() : null)),
  );
}
