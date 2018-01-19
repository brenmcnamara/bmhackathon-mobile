/* @flow */

import type { LoginCredentials } from '../reducers/authState';

export type Action = Action$Login | Action$Logout;

export type Action$Login = {|
  +credentials: LoginCredentials,
  +type: 'LOGIN',
|};

export function login(credentials: LoginCredentials) {
  return {
    credentials,
    type: 'LOGIN',
  };
}

export type Action$Logout = {|
  +type: 'LOGOUT',
|};

export function logout() {
  return { type: 'LOGOUT' };
}
