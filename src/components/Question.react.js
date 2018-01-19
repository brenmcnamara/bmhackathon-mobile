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

export type Props = {};

export default class Question extends Component<Props> {
  render() {
    return (
      <Animated.View style={styles.root}>
        <View style={styles.questionTimerContainer}>
          <QuestionTimer />
        </View>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>
            <Text style={styles.bold}>Robert Lewandowski</Text> is running for
            the goal! What is going to happen?
          </Text>
          <View style={styles.mcOptionsContainer}>
            <Option status="UNSELECTED" text="Goal!!" />
            <Option status="SELECTED" text="Shoot and Miss" />
            <Option status="UNSELECTED" text="Shoot and Blocked" />
            <Option status="UNSELECTED" text="Ball is Stolen" />
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
            backgroundColor: '#EFEFEF',
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
    marginTop: 24,
  },

  option: {
    alignItems: 'center',
    borderRadius: 2,
    height: 40,
    justifyContent: 'center',
    marginBottom: 4,
  },

  optionsText: {
    fontSize: 22,
  },

  questionCard: {
    backgroundColor: '#fff',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    marginHorizontal: 4,
    paddingHorizontal: 4,
    paddingTop: 8,
  },

  questionText: {
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
    fontWeight: '200',
    fontSize: 22,
  },

  questionTimerContainer: {
    marginBottom: 24,
  },

  root: {},
});
