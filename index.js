/* @flow */

import AppContainer from './src/components/AppContainer.react';
import Firebase from 'react-native-firebase';
import Store from './src/store';

import invariant from 'invariant';

import { AppRegistry } from 'react-native';
import { login } from './src/actions/auth';
import { removeGame, selectGame } from './src/actions/game';

AppRegistry.registerComponent('BM', () => AppContainer);

const LOGIN_EMAIL = 'me@brendan9.com';
const LOGIN_PASSWORD = 'public_password2';

let waitingForLogin = false;
Store.subscribe(() => {
  const { authState } = Store.getState();
  if (authState.status === 'LOGGED_OUT' && !waitingForLogin) {
    waitingForLogin = true;
    Store.dispatch(login({ email: LOGIN_EMAIL, password: LOGIN_PASSWORD }));
  } else if (authState.status === 'LOGGED_IN' && waitingForLogin) {
    waitingForLogin = false;
  }
});

Firebase.firestore()
  .collection('Game')
  .where('status', '==', 'IN_PROGRESS')
  .onSnapshot(snapshot => {
    invariant(
      snapshot.docs.length <= 1,
      'Only supports one game at a time for now',
    );

    if (snapshot.docs.length === 0) {
      if (Store.getState().gameState.game !== null) {
        Store.dispatch(removeGame());
      }
      return;
    }
    const game = snapshot.docs[0].data();

    invariant(
      Store.getState().gameState.game === null ||
        Store.getState().gameState.game.id === game.id,
      'Trying to select a new game when a game is already in progress',
    );
    Store.dispatch(selectGame(game));
  });
