/* @flow */

import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

export type Props = {
  questions: Array<Question>,
};

export const DotSize = 15;
export const DotSpacing = 8;

const ColorCorrect = '#407305';
const ColorIncorrect = '#D0021B';
const ColorUnknown = '#AAA';

export default class QuestionDots extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        {this.props.questions.map(question => (
          <Dot dotType="UNKNOWN" key={question.id} />
        ))}
      </View>
    );
  }
}

type DotProps = {
  dotType: 'CORRECT' | 'INCORRECT' | 'UNKNOWN',
};

class Dot extends Component<DotProps> {
  render() {
    const { dotType } = this.props;
    const backgroundColor =
      dotType === 'CORRECT'
        ? ColorCorrect
        : dotType === 'INCORRECT' ? ColorIncorrect : ColorUnknown;
    const dotStyles = [{ backgroundColor }, styles.dot];
    return <View style={dotStyles} />;
  }
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: DotSize / 2,
    height: DotSize,
    marginLeft: DotSpacing,
    marginTop: DotSpacing,
    width: DotSize,
  },

  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
