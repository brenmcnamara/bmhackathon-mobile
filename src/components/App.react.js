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
  screen: | 'GAME_SCREEN'
    | 'GAME_OVER_SCREEN'
    | 'NO_GAME_SCREEN'
    | 'LOGIN_SCREEN',
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

      case 'GAME_OVER_SCREEN': {
        content = <GameOverScreen />;
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
    screen: getScreen(state),
    showLeaderBoard: state.leaderBoard.showLeaderBoard,
  };
}

function getScreen(state: ReduxState) {
  const { game } = state.gameState;
  if (state.authState.status !== 'LOGGED_IN') {
    return 'LOADING_SCREEN';
  } else if (game === null) {
    return 'NO_GAME_SCREEN';
  }
  return game.status === 'COMPLETE_AND_PAID'
    ? 'GAME_OVER_SCREEN'
    : 'GAME_SCREEN';
}

export default connect(mapReduxStateToProps)(App);

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#efefef',
    flex: 1,
  },
});
