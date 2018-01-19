/* @flow */

import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

export type Props = {};

export const DotSize = 15;
export const DotSpacing = 8;

const ColorCorrect = '#407305';
const ColorIncorrect = '#D0021B';
const ColorUnknown = '#AAA';

export default class QuestionDots extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        {[
          'CORRECT',
          'CORRECT',
          'CORRECT',
          'INCORRECT',
          'INCORRECT',
          'INCORRECT',
          'UNKNOWN',
          'INCORRECT',
          'UNKNOWN',
          'UNKNOWN',
          'CORRECT',
          'CORRECT',
          'INCORRECT',
          'UNKNOWN',
          'UNKNOWN',
          'CORRECT',
          'CORRECT',
          'CORRECT',
          'INCORRECT',
          'INCORRECT',
          'INCORRECT',
          'UNKNOWN',
          'INCORRECT',
          'UNKNOWN',
          'UNKNOWN',
          'CORRECT',
          'CORRECT',
          'INCORRECT',
          'UNKNOWN',
          'UNKNOWN',
        ].map((t, i) => <Dot dotType={t} key={i} />)}
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
