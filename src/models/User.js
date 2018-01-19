/* @flow */

import Firebase from 'react-native-firebase';

import type { ID, ModelStub } from './types';

export type User = ModelStub<'User'> & {
  firstName: string,
  lastName: string,
};

export function genFetchUser(id: ID): Promise<User | null> {
  return Promise.resolve().then(() => {
    const db = Firebase.firestore();
    return db
      .collection('User')
      .doc(id)
      .get()
      .then(doc => (doc.exists ? doc.data() : null));
  });
}
