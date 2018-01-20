/* @flow */

import GameScreen from './GameScreen.react';
import GameOverScreen from './GameOverScreen.react';
import LeaderBoard from './LeaderBoard.react';
import LoadingScreen from './LoadingScreen.react';
import NoGameScreen from './NoGameScreen.react';
import React, { Component } from 'react';

import invariant from 'invariant';

import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import type { State as ReduxState } from '../store';

export type Props = {
  screen: 'GAME_SCREEN' | 'NO_GAME_SCREEN' | 'LOGIN_SCREEN',
};

class App extends Component<Props> {
  render() {
    const { screen } = this.props;
    let content;
    switch (screen) {
      case 'LOADING_SCREEN': {
        content = <LoadingScreen />;
        break;
      }

      case 'GAME_SCREEN': {
        content = <GameScreen />;
        break;
      }

      case 'NO_GAME_SCREEN': {
        content = <NoGameScreen />;
        break;
      }

      default:
        invariant(false, 'Unrecognized screen: %s', screen);
    }

    return (
      <View style={{ flex: 1 }}>
        {this.props.showLeaderBoard && <LeaderBoard />}
        <SafeAreaView style={styles.safeAreaView}>{content}</SafeAreaView>
      </View>
    );
  }
}

function mapReduxStateToProps(state: ReduxState) {
  return {
    screen:
      state.authState.status !== 'LOGGED_IN'
        ? 'LOADING_SCREEN'
        : state.gameState.game !== null ? 'GAME_SCREEN' : 'NO_GAME_SCREEN',
    showLeaderBoard: state.leaderBoard.showLeaderBoard,
  };
}
export default connect(mapReduxStateToProps)(App);

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#efefef',
    flex: 1,
  },
});
