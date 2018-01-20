/* @flow */

import React, { Component } from 'react';

import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

export type Props = {
  question: Question,
};

export const BarHeight = 4;
export const BarSpacing = 8;

const ColorGood = '#407305';
const ColorWarn = '#DF9924';
const ColorCritical = '#D0021B';

const { width: ScreenWidth } = Dimensions.get('window');
// NOTE: Assuming that this component gets the full width of the
// mobile screen here. This code will break if this is not followed.
const BarWidth = ScreenWidth - BarSpacing * 2;

export default class QuestionTimer extends Component<Props> {
  _fillerWidth: Animated.Value;

  componentWillMount(): void {
    const { question } = this.props;
    const nowMillis = Date.now();
    const startMillis = question.askAt.getTime();
    const endMillis = startMillis + question.timeLimit * 1000;
    this._fillerWidth = new Animated.Value(
      (endMillis - nowMillis) / (endMillis - startMillis) * BarWidth,
    );
  }

  componentDidMount(): void {
    const { question } = this.props;
    const startMillis = question.askAt.getTime();
    const nowMillis = Date.now();
    const endMillis = startMillis + question.timeLimit * 1000;
    Animated.timing(this._fillerWidth, {
      duration: endMillis - nowMillis,
      toValue: 0,
    }).start();
  }

  render() {
    const fillStyles = {
      backgroundColor: ColorGood,
      width: this._fillerWidth,
    };
    return (
      <View style={styles.root}>
        <Text style={styles.points}>2,345</Text>
        <View style={styles.bar}>
          <Animated.View style={fillStyles} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#B9B7B7',
    borderRadius: BarHeight / 2,
    flexDirection: 'row',
    height: BarHeight,
    marginHorizontal: BarSpacing,
    overflow: 'hidden',
  },

  points: {
    fontSize: 22,
    fontWeight: '200',
    marginBottom: 8,
    textAlign: 'center',
  },

  root: {},
});
