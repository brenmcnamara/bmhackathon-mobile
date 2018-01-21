/* @flow */

import React, { Component } from 'react';
import TempProfilePicIcon from '../../assets/TempProfilePic-36x36.png';
import TempProfilePicIcon2 from '../../assets/TempProfilePic2-36x36.png';
import TempProfilePicIcon3 from '../../assets/TempProfilePic3-36x36.png';
import TempProfilePicIcon4 from '../../assets/TempProfilePic4-36x36.png';
import TempProfilePicIcon5 from '../../assets/TempProfilePic5-36x36.png';

import { connect } from 'react-redux';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { updateLeaderBoard } from '../actions/leaderBoard';

export type Props = {};

type State = {
  transitionStage: | { type: 'TRANSITION_OUT' }
    | { type: 'TRANSITION_IN' }
    | { type: 'IN' },
};

const PANE_WIDTH = 250;

class LeaderBoard extends Component<Props, State> {
  _transitionValue: Animated.Value = new Animated.Value(0);

  state: State = {
    transitionStage: { type: 'OUT' },
  };

  componentDidMount(): void {
    this.setState({ transitionStage: { type: 'TRANSITION_IN' } });
    Animated.timing(this._transitionValue, {
      toValue: 1.0,
      duration: 400,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.setState({ transitionStage: { type: 'IN' } });
    });
  }

  render() {
    const paneStyles = [
      styles.pane,
      {
        marginLeft: this._transitionValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-PANE_WIDTH, 0],
        }),
      },
    ];

    return (
      <Modal animationType="none" transparent={true}>
        <View style={styles.root}>
          <TouchableWithoutFeedback onPress={this._onPressBackground}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>
          <Animated.View style={paneStyles}>
            <FlatList
              data={['DEMO']}
              keyExtractor={() => 'ONLY ONE'}
              renderItem={this._renderList}
            />
          </Animated.View>
        </View>
      </Modal>
    );
  }

  _renderList = (): void => {
    return (
      <View style={styles.list}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>FRIENDS</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>1.</Text>
          <Image
            resizeMode="contain"
            source={TempProfilePicIcon}
            style={styles.listPersonIcon}
          />
          <Text style={styles.listPersonPoints}>10,123</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>2.</Text>
          <Image
            resizeMode="contain"
            source={TempProfilePicIcon2}
            style={styles.listPersonIcon}
          />
          <Text style={styles.listPersonPoints}>10,004</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>3.</Text>
          <Image
            resizeMode="contain"
            source={TempProfilePicIcon3}
            style={styles.listPersonIcon}
          />
          <Text style={styles.listPersonPoints}>8,123</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>4.</Text>
          <Image
            resizeMode="contain"
            source={TempProfilePicIcon4}
            style={styles.listPersonIcon}
          />
          <Text style={styles.listPersonPoints}>6,929</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>5.</Text>
          <Image
            resizeMode="contain"
            source={TempProfilePicIcon5}
            style={styles.listPersonIcon}
          />
          <Text style={styles.listPersonPoints}>6,123</Text>
        </View>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderText}>GLOBAL</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>1.</Text>
          <Text style={styles.listPersonName}>Andrew B.</Text>
          <Text style={styles.listPersonPoints}>40,643</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>2.</Text>
          <Text style={styles.listPersonName}>Lance L.</Text>
          <Text style={styles.listPersonPoints}>40,442</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>3.</Text>
          <Text style={styles.listPersonName}>Doug P.</Text>
          <Text style={styles.listPersonPoints}>39,986</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>4.</Text>
          <Text style={styles.listPersonName}>Brendan M.</Text>
          <Text style={styles.listPersonPoints}>39,901</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>4.</Text>
          <Text style={styles.listPersonName}>Ethan R.</Text>
          <Text style={styles.listPersonPoints}>39,882</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>5.</Text>
          <Text style={styles.listPersonName}>Robby C.</Text>
          <Text style={styles.listPersonPoints}>39,803</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>6.</Text>
          <Text style={styles.listPersonName}>Sean O.</Text>
          <Text style={styles.listPersonPoints}>39,743</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>7.</Text>
          <Text style={styles.listPersonName}>Shawn F.</Text>
          <Text style={styles.listPersonPoints}>39,222</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>8.</Text>
          <Text style={styles.listPersonName}>Yuriy K.</Text>
          <Text style={styles.listPersonPoints}>39,201</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>9.</Text>
          <Text style={styles.listPersonName}>Andrew B.</Text>
          <Text style={styles.listPersonPoints}>39,100</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>10.</Text>
          <Text style={styles.listPersonName}>Francesco G.</Text>
          <Text style={styles.listPersonPoints}>38,962</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>11.</Text>
          <Text style={styles.listPersonName}>Arthur D.</Text>
          <Text style={styles.listPersonPoints}>38,912</Text>
        </View>
        <View style={styles.listPerson}>
          <Text style={styles.listPersonNumber}>12.</Text>
          <Text style={styles.listPersonName}>Krystoff Z.</Text>
          <Text style={styles.listPersonPoints}>39,873</Text>
        </View>
      </View>
    );
  };

  _onPressBackground = (): void => {
    this.setState({ transitionStage: { type: 'TRANSITION_OUT' } });
    Animated.timing(this._transitionValue, {
      toValue: 0.0,
      duration: 400,
      easing: Easing.out(Easing.cubic),
    }).start(() => {
      this.props.dispatch(updateLeaderBoard(false));
    });
  };
}

export default connect()(LeaderBoard);

const styles = StyleSheet.create({
  background: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  list: {
    marginVertical: 8,
  },

  listHeader: {
    borderBottomWidth: 1,
    borderColor: '#999',
    height: 60,
    justifyContent: 'flex-end',
  },

  listHeaderText: {
    color: '#DDD',
    fontSize: 14,
    marginBottom: 4,
    marginLeft: 4,
  },

  listPerson: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 8,
  },

  listPersonIcon: {
    borderColor: '#5D5D5D',
    borderWidth: 1,
    borderRadius: 15,
    height: 30,
    marginLeft: 8,
    width: 30,
  },

  listPersonName: {
    color: '#DDD',
    fontSize: 18,
    marginLeft: 8,
    width: 120,
  },

  listPersonNumber: {
    color: '#DDD',
    fontSize: 24,
    fontWeight: '200',
    width: 30,
  },

  listPersonPoints: {
    color: 'white',
    fontSize: 18,
    marginLeft: 12,
  },

  pane: {
    backgroundColor: '#122337',
    flex: 1,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.5,
    width: PANE_WIDTH,
  },

  root: {
    flex: 1,
  },
});
