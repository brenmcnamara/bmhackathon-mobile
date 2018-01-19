/* @flow */

import React, { Component } from 'react';

import { Animated, StyleSheet } from 'react-native';

export type Props = {};

export default class Question extends Component<Props> {
  render() {
    return <Animated.View style={styles.root} />;
  }
}

const styles = StyleSheet.create({
  root: {},
});
