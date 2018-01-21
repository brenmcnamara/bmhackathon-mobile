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
  | 'IN_PROGRESS'
  | 'NOT_YET_STARTED'
  | 'COMPLETE_AND_PENDING'
  | 'COMPELTE_AND_PAID';

export type GameTimer =
  | {|
      +startAt: Date,
      +type: 'FIRST_HALF' | 'SECOND_HALF',
    |}
  | {|
      +type: 'HALF_TIME',
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
