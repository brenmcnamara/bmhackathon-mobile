/* @flow */

import GameFooter, { Height as GameFooterHeight } from './GameFooter.react';
import Header from './Header.react';
import QuestionComponent from './Question.react';
import QuestionDots from './QuestionDots.react';
import React, { Component } from 'react';

import nullthrows from 'nullthrows';
import uuid from 'uuid/v4';

import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View } from 'react-native';
import { upsertSubmission } from '../actions/game';

import type { Game } from '../models/Game';
import type { Question } from '../models/Question';
import type { State as ReduxState } from '../store';
import type { Submission } from '../models/Submission';
import type { User } from '../models/User';

export type Props = {
  activeQuestion: Question | null,
  activeSubmission: Submission | null,
  inactiveQuestions: Array<Question>,
  game: Game,
  user: User,
};

class GameScreen extends Component<Props> {
  render() {
    const { game } = this.props;
    return (
      <View style={styles.root}>
        <Header />
        <View style={styles.questionContainer}>
          <QuestionComponent
            onSelectOption={this._onSelectOption}
            question={this.props.activeQuestion}
            submission={this.props.activeSubmission}
          />
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

  _onSelectOption = (index: number, pointValue: number): void => {
    const submission =
      this.props.activeSubmission ||
      createSubmission(
        this.props.user,
        this.props.game,
        nullthrows(this.props.activeQuestion),
      );
    this.props.dispatch(
      upsertSubmission({ ...submission, pointValue, predictionIndex: index }),
    );
  };
}

function createSubmission(
  user: User,
  game: Game,
  question: Question,
): Submission {
  const now = new Date();
  return {
    createdAt: now,
    gameRef: {
      pointerType: 'Game',
      refID: game.id,
      type: 'POINTER',
    },
    id: uuid(),
    modelType: 'Submission',
    pointValue: 0,
    predictionIndex: 0,
    type: 'MODEL',
    updatedAt: now,
    questionRef: {
      pointerType: 'Question',
      refID: question.id,
      type: 'POINTER',
    },
    userRef: {
      pointerType: 'USER',
      refID: user.id,
      type: 'POINTER',
    },
  };
}

function mapReduxStateToProps(state: ReduxState) {
  const { activeQuestion, activeSubmissionID } = state.gameState;
  return {
    activeQuestion: activeQuestion,
    activeSubmission: activeSubmissionID
      ? state.gameState.submissions[activeSubmissionID]
      : null,
    inactiveQuestions: state.gameState.inactiveQuestions,
    game: nullthrows(state.gameState.game),
    user: nullthrows(state.authState.loginPayload).user,
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
