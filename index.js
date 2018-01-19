/* @flow */

import AppContainer from './src/components/AppContainer.react';
import Store from './src/store';

import { AppRegistry } from 'react-native';
import { login } from './src/actions/auth';

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
