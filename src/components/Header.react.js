/* @flow */

import React, { Component } from 'react';
import TempProfilePicIcon from '../../assets/TempProfilePic-36x36.png';
import TrophyIcon from '../../assets/Trophy-29x29.png';

import { connect } from 'react-redux';
import { formatPoints } from '../utils/formatter';
import { getTotalPoints } from '../utils/state-utils';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { updateLeaderBoard } from '../actions/leaderBoard';

export type Props = {
  totalPoints: number,
};

const LeftIconWidth = 29;
const ProfilePicSize = 36;

class Header extends Component<Props> {
  render() {
    const { totalPoints } = this.props;
    const pointsFormatted = formatPoints(totalPoints);
    return (
      <View style={styles.root}>
        {this.props.hasGame && (
          <TouchableOpacity onPress={this._onPressLeft}>
            <Image resizeMode="contain" source={TrophyIcon} />
          </TouchableOpacity>
        )}
        {this.props.hasGame && (
          <Text style={styles.totalScoreText}>{`${
            pointsFormatted
          } points`}</Text>
        )}
        {!this.props.hasGame && <View style={{ flex: 1 }} />}
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

  _onPressLeft = (): void => {
    this.props.dispatch(updateLeaderBoard(true));
  };
}

function mapReduxStateToProps(state: ReduxState): Props {
  return {
    hasGame: Boolean(state.gameState.game),
    totalPoints: getTotalPoints(state),
  };
}

export default connect(mapReduxStateToProps)(Header);

const styles = StyleSheet.create({
  leftButton: {
    // NOTE: Assuming the width of the chevron is smaller than the width of
    // the profile pic here.
    paddingRight: ProfilePicSize - LeftIconWidth,
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
