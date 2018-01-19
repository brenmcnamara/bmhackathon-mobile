/* @flow */

import GameScreen from './GameScreen.react';
import LoadingScreen from './LoadingScreen.react';
import React, { Component } from 'react';

import { connect } from 'react-redux';

import type { State as ReduxState } from '../store';

export type Props = {
  screen: 'GAME_SCREEN' | 'LOGIN_SCREEN',
};

class App extends Component<Props> {
  render() {
    const { screen } = this.props;
    return screen === 'LOGIN_SCREEN' ? <LoadingScreen /> : <GameScreen />;
  }
}

function mapReduxStateToProps(state: ReduxState) {
  return {
    screen:
      state.authState.status === 'LOGGED_IN' ? 'GAME_SCREEN' : 'LOADING_SCREEN',
  };
}
export default connect(mapReduxStateToProps)(App);
