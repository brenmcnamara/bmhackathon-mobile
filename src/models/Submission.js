/* @flow */

import Firebase from 'react-native-firebase';

import type { ID, ModelStub, Pointer } from './types';

export type Submission = ModelStub<'Submission'> & {
  +gameRef: Pointer<'Game'>,
  +pointValue: number,
  +predictionIndex: number,
  +questionRef: Pointer<'Question'>,
  +userRef: Pointer<'User'>,
};

export function genCreateSubmission(submission: Submission): Promise<void> {
  return Promise.resolve().then(() =>
    Firebase.firestore()
      .collection('Submission')
      .doc(submission.id)
      .set(submission),
  );
}

export function genUpsertSubmission(submission: Submission): Promise<void> {
  return Promise.resolve().then(() =>
    Firebase.firestore()
      .collection('Submission')
      .doc(submission.id)
      .set(submission),
  );
}

export function genSubmissions(
  user: User,
  game: Game,
): Promise<{ [id: ID]: Submission }> {
  return Promise.resolve()
    .then(() =>
      Firebase.firestore()
        .collection('Submission')
        .where('userRef.refID', '==', user.id)
        .where('gameRef.refID', '==', game.id)
        .get(),
    )
    .then(snapshot => {
      const submissions = {};
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          const submission = doc.data();
          submissions[submission.id] = submission;
        }
      });
      return submissions;
    });
}
