/* @flow */

import QuestionTimer from './QuestionTimer.react';
import React, { Component } from 'react';

import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type Props = {
  question: Question | null,
};

export default class Question extends Component<Props> {
  render() {
    const { question } = this.props;
    if (!question) {
      return null;
    }
    return (
      <Animated.View style={styles.root}>
        <View style={styles.questionTimerContainer}>
          <QuestionTimer question={question} />
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.query}</Text>
          <View style={styles.mcOptionsContainer}>
            {question.options.map((o, i) => (
              <Option key={i} status="UNSELECTED" text={o} />
            ))}
          </View>
        </View>
      </Animated.View>
    );
  }
}

type OptionProps = {
  status: 'UNSELECTED' | 'SELECTED',
  text: string,
};

class Option extends Component<OptionProps> {
  render() {
    const { status, text } = this.props;
    const optionStyles = [
      status === 'UNSELECTED'
        ? {
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: '#D8D8D8',
          }
        : { backgroundColor: '#4A90E2' },
      styles.option,
    ];
    const textStyles = [
      status === 'UNSELECTED'
        ? { fontWeight: '200' }
        : { fontWeight: 'normal', color: 'white' },
      styles.optionsText,
    ];
    return (
      <TouchableOpacity>
        <View style={optionStyles}>
          <Text style={textStyles}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'normal',
  },

  mcOptionsContainer: {
    marginHorizontal: 4,
    marginTop: 24,
  },

  option: {
    alignItems: 'center',
    borderRadius: 1,
    height: 40,
    justifyContent: 'center',
    marginBottom: 4,
  },

  optionsText: {
    fontSize: 22,
  },

  questionContainer: {},

  questionText: {
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
    fontWeight: '200',
    fontSize: 22,
    lineHeight: 30,
    marginHorizontal: 32,
  },

  questionTimerContainer: {
    marginBottom: 24,
  },

  root: {},
});
