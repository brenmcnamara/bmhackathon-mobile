/* @flow */

import Header from './Header.react';
import React, { Component } from 'react';
import TVIcon from '../../assets/TV-161x100.png';

import { Image, StyleSheet, Text, View } from 'react-native';

export type Props = {};

export default class NoGameScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <Header />
        <View style={styles.nullContent}>
          <Image resizeMode="contain" source={TVIcon} style={styles.nullIcon} />
          <Text style={styles.nullText}>
            No trivia at the moment. Stay tuned!
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nullContent: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 40,
    marginTop: 120,
  },

  nullText: {
    fontSize: 24,
    fontWeight: '200',
    marginTop: 32,
    textAlign: 'center',
  },

  root: {
    flex: 1,
  },
});
