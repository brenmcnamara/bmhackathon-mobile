/* @flow */

import React, { Component } from 'react';

import { ActivityIndicator, StyleSheet, View } from 'react-native';

export type Props = {};

export default class LoadingScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
