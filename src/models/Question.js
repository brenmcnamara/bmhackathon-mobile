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
    .onSnapshot(snapshot => {
      const questions = snapshot.docs
        .filter(doc => doc.exists)
        .map(doc => doc.data());
      // TODO: Should be sorting server-side.
      questions.sort((q1, q2) => q1.askAt.getTime() - q2.askAt.getTime());
      callback(questions);
    });
}
