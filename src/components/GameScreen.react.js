/* @flow */

import GameFooter, { Height as GameFooterHeight } from './GameFooter.react';
import Header from './Header.react';
import QuestionComponent from './Question.react';
import QuestionDots from './QuestionDots.react';
import React, { Component } from 'react';

import nullthrows from 'nullthrows';

import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View } from 'react-native';

import type { Game } from '../models/Game';
import type { Question } from '../models/Question';
import type { State as ReduxState } from '../store';

export type Props = {
  activeQuestion: Question | null,
  inactiveQuestions: Array<Question>,
  game: Game,
};

class GameScreen extends Component<Props> {
  render() {
    const { game } = this.props;
    return (
      <View style={styles.root}>
        <Header />
        <View style={styles.questionContainer}>
          <QuestionComponent question={this.props.activeQuestion} />
        </View>
        <View style={styles.questionDotsContainer}>
          <QuestionDots questions={this.props.inactiveQuestions} />
        </View>
        <View style={styles.gameFooterContainer}>
          <GameFooter game={game} />
        </View>
      </View>
    );
  }
}

function mapReduxStateToProps(state: ReduxState) {
  const { activeQuestion } = state.gameState;
  return {
    activeQuestion: activeQuestion,
    inactiveQuestions: state.gameState.inactiveQuestions,
    game: nullthrows(state.gameState.game),
  };
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
