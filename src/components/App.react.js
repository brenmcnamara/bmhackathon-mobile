/* @flow */

import GameScreen from './GameScreen.react';
import LoadingScreen from './LoadingScreen.react';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet } from 'react-native';

import type { State as ReduxState } from '../store';

export type Props = {
  screen: 'GAME_SCREEN' | 'LOGIN_SCREEN',
};

class App extends Component<Props> {
  render() {
    const { screen } = this.props;
    const content =
      screen === 'LOGIN_SCREEN' ? <LoadingScreen /> : <GameScreen />;
    return <SafeAreaView style={styles.safeAreaView}>{content}</SafeAreaView>;
  }
}

function mapReduxStateToProps(state: ReduxState) {
  return {
    screen:
      state.authState.status === 'LOGGED_IN' ? 'GAME_SCREEN' : 'LOADING_SCREEN',
  };
}
export default connect(mapReduxStateToProps)(App);

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#efefef',
    flex: 1,
  },
});
