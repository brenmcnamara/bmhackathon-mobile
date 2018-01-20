/* @flow */

import React, { Component } from 'react';

import {
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { formatPoints } from '../utils/formatter';

export type Props = {
  pointValue: number,
  question: Question,
  shouldLock: bool,
};

export const BarHeight = 4;
export const BarSpacing = 8;

const ColorLock = 'rgba(255, 255, 255, 0.3)';
const ColorGood = '#407305';
const ColorCritical = '#D0021B';
const ColorOutterLock = '#4A90E2';

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
    const ratio = (endMillis - nowMillis) / (endMillis - startMillis);
    this._fillerWidth = new Animated.Value(ratio * BarWidth);
  }

  componentDidMount(): void {
    const { question } = this.props;
    const startMillis = question.askAt.getTime();
    const nowMillis = Date.now();
    const timeLimitMillis = question.timeLimit * 1000;
    const endMillis = startMillis + timeLimitMillis;

    Animated.timing(this._fillerWidth, {
      duration: endMillis - nowMillis,
      easing: Easing.linear,
      toValue: 0,
    }).start();
  }

  render() {
    const fillStyles = {
      backgroundColor: this.props.shouldLock
        ? ColorLock
        : this._fillerWidth.interpolate({
            inputRange: [0, BarWidth],
            outputRange: [ColorCritical, ColorGood],
          }),
      width: this._fillerWidth,
    };

    const outterFillStyles = {
      backgroundColor: this.props.shouldLock ? ColorOutterLock : '#B9B7B7',
      flexDirection: 'row',
      height: BarHeight,
      width: this.props.shouldLock
        ? this._calculateRatio(this.props) * BarWidth
        : BarWidth,
    };

    const formattedPoints = formatPoints(this.props.pointValue);
    return (
      <View style={styles.root}>
        <Text style={styles.points}>{formattedPoints}</Text>
        <View style={styles.bar}>
          <View style={outterFillStyles}>
            <Animated.View style={fillStyles} />
          </View>
        </View>
      </View>
    );
  }

  _calculateRatio(props: Props): number {
    const startMillis = props.question.askAt.getTime();
    const endMillis = startMillis + props.question.timeLimit * 1000;
    const nowMillis = Date.now();
    return (endMillis - nowMillis) / (endMillis - startMillis);
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
