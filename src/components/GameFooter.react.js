/* @flow */

import React, { Component } from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import { Teams } from '../models/Team';

export type Props = {};

export const Height = 50;
export const TeamIconSize = 30;

const MidDot = String.fromCharCode(8226);

export default class GameFooter extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <View style={styles.score}>
            <Image
              resizeMode="contain"
              source={Teams.BARCELONA.icon}
              style={styles.teamIcon}
            />
            <Text style={styles.scoreText}>{'1  :  2'}</Text>
            <Image
              resizeMode="contain"
              source={Teams.BAYERN_MUNICH.icon}
              style={styles.teamIcon}
            />
          </View>
          <View style={styles.headerSpacer} />
          <View style={styles.gameTimer}>
            <Text style={styles.gameTimerText}>{`Second Half ${
              MidDot
            } 35:43`}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gameTimer: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  gameTimerText: {
    fontSize: 18,
    color: '#757575',
  },

  header: {
    flexDirection: 'row',
    height: Height,
    paddingHorizontal: 8,
  },

  headerSpacer: {
    flex: 1,
  },

  root: {
    backgroundColor: 'white',
    borderColor: '#d8d8d8',
    borderTopWidth: 1,
    height: Height,
  },

  score: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 8,
  },

  scoreText: {
    color: '#757575',
    fontSize: 24,
    marginHorizontal: 12,
  },

  teamIcon: {
    height: TeamIconSize,
    width: TeamIconSize,
  },
});
