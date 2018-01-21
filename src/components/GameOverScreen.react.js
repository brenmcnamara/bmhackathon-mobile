/* @flow */

import GameFooter, { Height as GameFooterHeight } from './GameFooter.react';
import GoldCoinIcon from '../../assets/GoldCoin-100x100.png';
import Header from './Header.react';
import QuestionDots from './QuestionDots.react';
import React, { Component } from 'react';

import nullthrows from 'nullthrows';

import {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import type { Game } from '../models/Game';
import type { ID } from '../models/types';
import type { Question } from '../models/Question';
import type { State as ReduxState } from '../store';
import type { Submission } from '../models/Submission';
import type { User } from '../models/User';

export type Props = {
  activeQuestion: Question | null,
  activeSubmission: Submission | null,
  inactiveQuestions: Array<Question>,
  game: Game,
  submissions: { [id: ID]: Submission },
  user: User,
};

export type State = {
  transitionStage: 'IN' | 'TRANSITION_IN' | 'OUT',
};

class GameOverScreen extends Component<Props> {
  state: State = {
    transitionStage: 'OUT',
  };

  _transitionValue: Animated.Value = new Animated.Value(0);

  componentDidMount(): void {
    this.setState({ transitionStage: 'TRANSITION_IN' });
    Animated.timing(this._transitionValue, {
      easing: Easing.out(Easing.cubic),
      duration: 1000,
      delay: 200,
      toValue: 1.0,
    }).start(() => {
      this.setState({ transitionStage: 'IN' }, this._loop);
    });
  }

  render() {
    const { game } = this.props;
    const { transitionStage } = this.state;
    const iconStyles = [
      styles.icon,
      {
        opacity: transitionStage === 'IN' ? 1.0 : this._transitionValue,
        transform: [
          {
            translateY: this._transitionValue.interpolate({
              inputRange: [0, 1],
              outputRange: [this.state.transitionStage === 'IN' ? 30 : 300, 0],
            }),
          },
        ],
      },
    ];
    const textContainerStyles = [
      styles.textContainer,
      {
        opacity: transitionStage === 'IN' ? 1.0 : this._transitionValue,
        transform:
          transitionStage === 'IN'
            ? []
            : [
                {
                  translateY: this._transitionValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
      },
    ];
    return (
      <View style={styles.root}>
        <Header />
        <View style={styles.gameOverContainer}>
          <Animated.View style={textContainerStyles}>
            <Text style={styles.text}>
              Congrats! You won a Bayern Coin! Visit the Bayern Munich Store to
              redeem
            </Text>
          </Animated.View>
          <Animated.Image
            resizeMode="contain"
            source={GoldCoinIcon}
            style={iconStyles}
          />
        </View>
        <View style={styles.questionDotsContainer}>
          <QuestionDots
            questions={this.props.inactiveQuestions}
            submissions={this.props.submissions}
          />
        </View>
        <View style={styles.gameFooterContainer}>
          <GameFooter game={game} />
        </View>
      </View>
    );
  }

  _loop = (): void => {
    if (this.state.transitionStage !== 'IN') {
      return;
    }
    Animated.timing(this._transitionValue, {
      toValue: 0.0,
      duration: 3000,
      easing: Easing.out(Easing.quad),
    }).start(() => {
      Animated.timing(this._transitionValue, {
        toValue: 1.0,
        duration: 3000,
        easing: Easing.out(Easing.quad),
      }).start(this._loop);
    });
  };
}

function mapReduxStateToProps(state: ReduxState) {
  const { activeQuestion, activeSubmissionID, submissions } = state.gameState;
  return {
    activeQuestion: activeQuestion,
    activeSubmission: activeSubmissionID
      ? submissions[activeSubmissionID]
      : null,
    inactiveQuestions: state.gameState.inactiveQuestions,
    game: nullthrows(state.gameState.game),
    submissions,
    user: nullthrows(state.authState.loginPayload).user,
  };
}

export default connect(mapReduxStateToProps)(GameOverScreen);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  gameFooterContainer: {
    bottom: 0,
    position: 'absolute',
    width,
  },

  gameOverContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 32,
  },

  questionDotsContainer: {
    marginBottom: 8,
  },

  root: {
    flex: 1,
    paddingBottom: GameFooterHeight,
  },

  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginHorizontal: 24,
  },

  text: {
    color: '#666',
    fontSize: 22,
    textAlign: 'center',
  },
});
