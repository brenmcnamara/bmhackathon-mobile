/* @flow */

import ChevronDownIcon from '../../assets/ChevronDown-23x9.png';
import React, { Component } from 'react';
import TempProfilePicIcon from '../../assets/TempProfilePic-36x36.png';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type Props = {};

const ChevronWidth = 23;
const ProfilePicSize = 36;

export default class Header extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity>
          <Image resizeMode="contain" source={ChevronDownIcon} />
        </TouchableOpacity>
        <Text style={styles.totalScoreText}>10,124 points</Text>
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            source={TempProfilePicIcon}
            style={styles.profilePic}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftButton: {
    // NOTE: Assuming the width of the chevron is smaller than the width of
    // the profile pic here.
    paddingRight: ProfilePicSize - ChevronWidth,
  },

  profilePic: {
    borderColor: '#5D5D5D',
    borderRadius: ProfilePicSize / 2,
    borderWidth: 1,
    height: ProfilePicSize,
    overflow: 'hidden',
    width: ProfilePicSize,
  },

  root: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: 12,
  },

  totalScoreText: {
    color: '#4A90E2',
    fontSize: 22,
    flex: 1,
    textAlign: 'center',
  },
});