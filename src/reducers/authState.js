/* @flow */

import type { PureAction } from '../store';
import type { User } from '../models/User';

export type AuthStatus =
  | 'UNKNOWN'
  | 'LOGGED_IN'
  | 'TRANSITIONING'
  | 'LOGGED_OUT';

export type State = {
  +loginPayload: LoginPayload | null,
  +status: AuthStatus,
};

export type LoginCredentials = {|
  +email: string,
  +password: string,
|};

export type LoginPayload = {|
  +firebaseUser: Object,
  +user: User,
|};

const DEFAULT_STATE = {
  loginPayload: null,
  status: 'UNKNOWN',
};

export default function authState(
  state: State = DEFAULT_STATE,
  action: PureAction,
): State {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        loginPayload: action.loginPayload,
        status: 'LOGGED_IN',
      };
    }

    case 'LOGOUT_SUCCESS': {
      return {
        ...state,
        loginPayload: null,
        status: 'LOGGED_OUT',
      };
    }
  }
  return state;
}
