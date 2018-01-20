/* @flow */

import type { State as ReduxState } from '../store';

export function getTotalPoints(state: ReduxState): number {
  const { inactiveQuestions, submissions } = state.gameState;
  return inactiveQuestions.reduce((memo, question) => {
    const submission = getSubmissionForQuestion(submissions, question);
    if (
      !submission ||
      question.isCanceled ||
      question.correctIndex !== submission.predictionIndex
    ) {
      return memo;
    }
    return memo + submission.pointValue;
  }, 0);
}

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
