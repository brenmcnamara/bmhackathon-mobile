/* @flow */

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import type { State as ReduxState } from '../store';

export type Props = {};

class GameScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <Text>Hello World</Text>
      </View>
    );
  }
}

function mapReduxStateToProps(state: ReduxState) {
  return {};
}

export default connect(mapReduxStateToProps)(GameScreen);

const styles = StyleSheet.create({
  root: {},
});
