/* @flow */

import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

import type { ID } from '../models/types';

export type Props = {
  questions: Array<Question>,
  submissions: { [id: ID]: Submission },
};

export const DotSize = 15;
export const DotSpacing = 8;

const ColorCorrect = '#407305';
const ColorIncorrect = '#D0021B';
const ColorUnknown = '#AAA';

export default class QuestionDots extends Component<Props> {
  render() {
    const { questions, submissions } = this.props;
    return (
      <View style={styles.root}>
        {questions.map(question => {
          // NOTE: We are assuming that all questions here have already been
          // locked.
          const submission = getSubmissionForQuestion(submissions, question);
          const dotType =
            question.isCanceled || question.correctIndex === 'UNKNOWN'
              ? 'UNKNOWN'
              : submission &&
                question.correctIndex === submission.predictionIndex
                ? 'CORRECT'
                : 'INCORRECT';
          return <Dot dotType={dotType} key={question.id} />;
        })}
      </View>
    );
  }
}

type DotProps = {
  dotType: 'CORRECT' | 'INCORRECT' | 'UNKNOWN',
};

function getSubmissionForQuestion(
  submissions: { [id: ID]: Submission },
  question: Question,
): Submission | null {
  for (let id in submissions) {
    if (submissions.hasOwnProperty(id)) {
      const submission = submissions[id];
      if (submission.questionRef.refID === question.id) {
        return submission;
      }
    }
  }
  return null;
}

class Dot extends Component<DotProps> {
  render() {
    const { dotType } = this.props;
    const backgroundColor =
      dotType === 'CORRECT'
        ? ColorCorrect
        : dotType === 'INCORRECT' ? ColorIncorrect : ColorUnknown;
    const dotStyles = [{ backgroundColor }, styles.dot];
    return <View style={dotStyles} />;
  }
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: DotSize / 2,
    height: DotSize,
    marginLeft: DotSpacing,
    marginTop: DotSpacing,
    width: DotSize,
  },

  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
