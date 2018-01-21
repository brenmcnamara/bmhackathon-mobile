/* @flow */

import React, { Component } from 'react';

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
          {game.status !== 'COMPLETE_AND_PAID' && (
            <View style={styles.gameTimer}>
              <Text style={styles.gameTimerText}>{this._getTimerName()}</Text>
              {this._renderTimer()}
            </View>
          )}
        </View>
      </View>
    );
  }

  _renderTimer() {
    const { game } = this.props;
    if (game.timer.type === 'HALF_TIME') {
      return null;
    }
    return (
      <View style={{ width: 60 }}>
        <GameTime start={game.timer.startAt} />
      </View>
    );
  }

  _getTimerName() {
    switch (this.props.game.timer.type) {
      case 'FIRST_HALF':
        return 'First Half ' + MidDot;
      case 'SECOND_HALF':
        return 'Second Half ' + MidDot;
      case 'HALF_TIME':
        return 'Half Time';
      default:
        return '';
    }
  }
}

type GameTimeProps = {
  start: Date,
};

type GameTimeState = {
  secondsSinceStart: number,
};

class GameTime extends Component<GameTimeProps, GameTimeState> {
  _interval: number | null = null;
  _timer: number | null = null;

  constructor(props: Props) {
    super(props);
    const nowMillis = Date.now();
    this.state = {
      secondsSinceStart: Math.floor(
        (nowMillis - this.props.start.getTime()) / 1000,
      ),
    };
  }

  componentDidMount(): void {
    const startMillis = this.props.start.getTime();
    const nowMillis = Date.now();
    const deltaMillis = nowMillis - startMillis;
    this._timer = setTimeout(() => {
      this._updateSeconds();
      this._interval = setInterval(this._updateSeconds, 1000);
    }, deltaMillis % 1000);
  }

  componentWillUnmount(): void {
    this._interval && clearInterval(this._interval);
    this._timer && clearTimeout(this._timer);
  }

  render() {
    const minutes = Math.floor(this.state.secondsSinceStart / 60);
    const seconds = this.state.secondsSinceStart % 60;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes.toString();
    const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds.toString();
    return (
      <Text style={styles.gameTimerText}>
        {`${minutesFormatted}:${secondsFormatted}`}
      </Text>
    );
  }

  _updateSeconds = (): void => {
    const startMillis = this.props.start.getTime();
    const nowMillis = Date.now();
    const deltaMillis = nowMillis - startMillis;
    this.setState({
      secondsSinceStart: Math.floor(deltaMillis / 1000),
    });
  };
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
