/* @flow */

import QuestionTimer from './QuestionTimer.react';
import React, { Component } from 'react';

import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type Props = {
  onSelectOption: (index: number, pointValue: number) => any,
  question: Question | null,
  submission: Submission | null,
};

type State = {
  pointValue: number | null,
};

const TRANSITION_OFFSET = 30;

export default class Question extends Component<Props, State> {
  _fadeValue: Animated.Value;
  _shouldUpdatePointValue: bool = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      pointValue: props.question ? calculatePointValue(props.question) : null,
    };
  }

  componentWillMount(): void {
    this._fadeValue = new Animated.Value(this.props.question ? 1.0 : 0.0);
  }

  componentDidMount(): void {
    this._shouldUpdatePointValue = Boolean(
      this.props.question && !this.props.submission,
    );
    this._maybeRunPointValueUpdateLoop();
  }

  componentWillReceiveProps(nextProps: Props): void {
    this._shouldUpdatePointValue = Boolean(
      nextProps.question && !nextProps.submission,
    );
    if (nextProps.question && !this.props.question) {
      Animated.timing(this._fadeValue, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
        toValue: 1.0,
      }).start();
    } else if (!nextProps.question && this.props.question) {
      // TODO: Implement me!
      this._fadeValue.setValue(0.0);
    }
    this._maybeRunPointValueUpdateLoop();
  }

  componentWillUnmount(): void {
    this._shouldUpdatePointValue = false;
  }

  render() {
    const rootStyles = [
      {
        opacity: this._fadeValue,
        transform: [
          {
            translateY: this._fadeValue.interpolate({
              inputRange: [0, 1],
              outputRange: [TRANSITION_OFFSET, 0],
            }),
          },
        ],
      },
      styles.root,
    ];

    return (
      <Animated.View style={rootStyles}>{this._renderContent()}</Animated.View>
    );
  }

  _renderContent() {
    const { question, submission } = this.props;
    if (!question) {
      return null;
    }
    const { pointValue } = this.state;
    return [
      <View key="FIRST" style={styles.questionTimerContainer}>
        <QuestionTimer
          pointValue={pointValue}
          question={question}
          shouldLock={Boolean(submission)}
        />
      </View>,
      <View key="SECOND" style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.query}</Text>
        <View style={styles.mcOptionsContainer}>
          {question.options.map((o, i) => (
            <Option
              key={i}
              onPress={() => this._onSelectOption(i)}
              status={
                submission && submission.predictionIndex === i
                  ? 'SELECTED'
                  : 'UNSELECTED'
              }
              text={o}
            />
          ))}
        </View>
      </View>,
    ];
  }

  _maybeRunPointValueUpdateLoop = (): void => {
    if (!this._shouldUpdatePointValue) {
      return;
    }
    requestAnimationFrame(() => {
      const { question } = this.props;
      if (question) {
        this.setState({
          pointValue: calculatePointValue(question),
        });
      }
      this._maybeRunPointValueUpdateLoop();
    });
  };

  _onSelectOption = (index: number): void => {
    const { question, submission } = this.props;
    if (!submission || submission.predictionIndex !== index) {
      this._shouldUpdatePointValue = false;
      const pointValue = calculatePointValue(question);
      this.setState({ pointValue });
      this.props.onSelectOption(index, this.state.pointValue);
    }
  };
}

type OptionProps = {
  onPress: () => any,
  status: 'UNSELECTED' | 'SELECTED',
  text: string,
};

class Option extends Component<OptionProps> {
  render() {
    const { status, text } = this.props;
    const optionStyles = [
      status === 'UNSELECTED'
        ? {
            backgroundColor: '#FFF',
            borderWidth: 1,
            borderColor: '#D8D8D8',
          }
        : { backgroundColor: '#4A90E2' },
      styles.option,
    ];
    const textStyles = [
      status === 'UNSELECTED'
        ? { fontWeight: '200' }
        : { fontWeight: 'normal', color: 'white' },
      styles.optionsText,
    ];
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={optionStyles}>
          <Text style={textStyles}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

function calculatePointValue(question: Question): number {
  const startMillis = question.askAt.getTime();
  const endMillis = startMillis + question.timeLimit * 1000;
  const nowMillis = Date.now();
  const ratio = (endMillis - nowMillis) / (endMillis - startMillis);
  return Math.max(0, Math.floor(ratio * question.maxPointValue));
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'normal',
  },

  mcOptionsContainer: {
    marginHorizontal: 4,
    marginTop: 24,
  },

  option: {
    alignItems: 'center',
    borderRadius: 1,
    height: 40,
    justifyContent: 'center',
    marginBottom: 4,
  },

  optionsText: {
    fontSize: 22,
  },

  questionContainer: {},

  questionText: {
    textAlign: 'center',
    fontFamily: 'HelveticaNeue',
    fontWeight: '200',
    fontSize: 22,
    lineHeight: 30,
    marginHorizontal: 32,
  },

  questionTimerContainer: {
    marginBottom: 24,
  },

  root: {},
});
