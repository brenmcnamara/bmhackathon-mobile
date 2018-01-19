/* @flow */

import Firebase from 'react-native-firebase';

import nullthrows from 'nullthrows';

import { genFetchUser } from '../models/User';

import type { Action as AllActions, ReduxStore } from '../store';
import type { LoginPayload, State as AuthState } from '../reducers/authState';

export type Action = Action$Login | Action$Logout | Action$AuthTransition;

export type Action$Login = {|
  +loginPayload: LoginPayload,
  +type: 'LOGIN_SUCCESS',
|};

export type Action$Logout = {|
  +type: 'LOGOUT_SUCCESS',
|};

export type Action$AuthTransition = {|
  +type: 'AUTH_TRANSITION',
|};

export default (store: ReduxStore) => (next: Function) => {
  const Auth = Firebase.auth();

  Auth.onAuthStateChanged(async () => {
    const { authState } = store.getState();
    const { currentUser } = Auth;
    if (canLogin(authState) && currentUser) {
      const user = await genFetchUser(currentUser.uid);
      next({
        loginPayload: { user: nullthrows(user), firebaseUser: currentUser },
        type: 'LOGIN_SUCCESS',
      });
    } else if (canLogout(authState) && !currentUser) {
      next({
        type: 'LOGOUT_SUCCESS',
      });
    }
  });

  return (action: AllActions) => {
    next(action);

    switch (action.type) {
      case 'LOGIN': {
        next({ type: 'AUTH_TRANSITION' });
        const { credentials } = action;
        Auth.signInWithEmailAndPassword(
          credentials.email,
          credentials.password,
        ).catch(() => {
          next({ type: 'LOGOUT_SUCCESS' });
        });
        break;
      }

      case 'LOGOUT': {
        next({ type: 'AUTH_TRANSITION' });
        Auth.signOut().catch(() => {
          genFetchUser(Auth.currentUser.uid).then(user => {
            const loginPayload = {
              user: nullthrows(user),
              firebaseUser: Auth.currentUser,
            };
            next({ loginPayload, type: 'LOGIN_SUCCESS' });
          });
        });
      }
    }
  };
};

function canLogin(authState: AuthState): bool {
  return authState.status !== 'LOGGED_IN';
}

function canLogout(authState: AuthState): bool {
  return authState.status !== 'LOGGED_OUT';
}
