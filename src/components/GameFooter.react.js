/* @flow */

import React, { Component } from 'react';
import RefreshOnInterval from './RefreshOnInterval.react';

import { Image, StyleSheet, Text, View } from 'react-native';
import { Teams } from '../models/Team';

export type Props = {
  game: Game,
};

export const Height = 50;
export const TeamIconSize = 30;

const MidDot = String.fromCharCode(8226);

export default class GameFooter extends Component<Props> {
  render() {
    const { game } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <View style={styles.score}>
            <Image
              resizeMode="contain"
              source={Teams[game.home].icon}
              style={styles.teamIcon}
            />
            <Text style={styles.scoreText}>
              {`${game.homeScore}  :  ${game.awayScore}`}
            </Text>
            <Image
              resizeMode="contain"
              source={Teams[game.away].icon}
              style={styles.teamIcon}
            />
          </View>
          <View style={styles.headerSpacer} />
          <View style={styles.gameTimer}>
            <Text style={styles.gameTimerText}>
              {game.timer.type === 'FIRST_HALF' ? 'First Half' : 'Second Half'}
              {` ${MidDot} `}
            </Text>
            <View style={{ width: 60 }}>
              <RefreshOnInterval
                intervalMillis={1000}
                render={() => (
                  <Text style={styles.gameTimerText}>
                    {this._getFormattedMinutes(game.timer.startAt)}
                  </Text>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  _getFormattedMinutes(start: Date) {
    const nowMillis = Date.now();
    const startMillis = start.getTime();

    const minutes = (nowMillis - startMillis) / 1000 / 60;
    const seconds = (minutes - Math.floor(minutes)) * 60;
    const minutesFormatted =
      minutes >= 10 ? Math.floor(minutes) : '0' + Math.floor(minutes);
    const secondsFormatted =
      seconds >= 10 ? Math.floor(seconds) : '0' + Math.floor(seconds);
    return `${minutesFormatted}:${secondsFormatted}`;
  }
}

const styles = StyleSheet.create({
  gameTimer: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  gameTimerText: {
    alignItems: 'center',
    color: '#757575',
    flexDirection: 'row',
    fontSize: 20,
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
