/* @flow */

import GameFooter, { Height as GameFooterHeight } from './GameFooter.react';
import Header from './Header.react';
import Question from './Question.react';
import QuestionDots from './QuestionDots.react';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View } from 'react-native';

import type { State as ReduxState } from '../store';

export type Props = {};

class GameScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <Header />
        <View style={styles.questionContainer}>
          <Question />
        </View>
        <View style={styles.questionDotsContainer}>
          <QuestionDots />
        </View>
        <View style={styles.gameFooterContainer}>
          <GameFooter />
        </View>
      </View>
    );
  }
}

function mapReduxStateToProps(state: ReduxState) {
  return {};
}

export default connect(mapReduxStateToProps)(GameScreen);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  gameFooterContainer: {
    bottom: 0,
    position: 'absolute',
    width,
  },

  questionContainer: {
    flex: 1,
    marginTop: 32,
  },

  questionDotsContainer: {
    marginBottom: 8,
  },

  root: {
    flex: 1,
    paddingBottom: GameFooterHeight,
  },
});
