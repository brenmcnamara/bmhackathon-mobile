/* @flow */

import React, { Component } from 'react';

import { Dimensions, StyleSheet, Text, View } from 'react-native';

export type Props = {};

export const BarHeight = 6;
export const BarSpacing = 8;

const ColorGood = '#407305';
const ColorWarn = '#DF9924';
const ColorCritical = '#D0021B';

const { width: ScreenWidth } = Dimensions.get('window');
// NOTE: Assuming that this component gets the full width of the
// mobile screen here. This code will break if this is not followed.
const BarWidth = ScreenWidth - BarSpacing * 2;

export default class QuestionTimer extends Component<Props> {
  render() {
    const fillStyles = {
      backgroundColor: ColorGood,
      width: BarWidth * 0.3,
    };
    return (
      <View style={styles.root}>
        <Text style={styles.points}>2,345</Text>
        <View style={styles.bar}>
          <View style={fillStyles} />
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
    marginBottom: 8,
    textAlign: 'center',
  },

  root: {},
});
