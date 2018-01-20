/* @flow */

import Firebase from 'react-native-firebase';

import type { ModelStub, Pointer, Seconds } from './types';

export type Question = ModelStub<'Question'> & {
  +askAt: Date,
  +correctIndex: number | 'UNKNOWN',
  +gameRef: Pointer<'Game'>,
  +isCanceled: bool,
  +options: Array<string>,
  +query: string,
  +timeLimit: Seconds,
};

export type Subscription = () => void;

export function listenToQuestions(
  gameID: ID,
  callback: (Array<Question>) => any,
): Subscription {
  return Firebase.firestore()
    .collection('Question')
    .where('gameRef.refID', '==', gameID)
    .orderBy('askAt', 'desc')
    .onSnapshot(snapshot =>
      snapshot.docs.filter(doc => doc.exists).map(doc => doc.data()),
    );
}
