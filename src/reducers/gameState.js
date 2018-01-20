/* @flow */

import invariant from 'invariant';

import type { Game } from '../models/Game';
import type { ID } from '../models/types';
import type { PureAction } from '../store';
import type { Question } from '../models/Question';
import type { Submission } from '../models/Submission';

export type State = {
  +activeQuestion: Question | null,
  +activeSubmissionID: ID | null,
  +game: Game | null,
  +inactiveQuestions: Array<Question>,
  +questions: Array<Question>,
  +submissions: { [id: ID]: Submission },
};

const DEFAULT_STATE = {
  activeQuestion: null,
  activeSubmissionID: null,
  game: null,
  inactiveQuestions: [],
  questions: [],
  submissions: {},
};

export default function gameState(
  state: State = DEFAULT_STATE,
  action: PureAction,
): State {
  switch (action.type) {
    case 'SELECT_GAME': {
      return { ...state, game: action.game };
    }

    case 'REMOVE_GAME': {
      return { ...state, game: null };
    }

    case 'UPDATE_ACTIVE_QUESTION': {
      const { activeQuestion } = action;
      invariant(
        !activeQuestion || state.questions.includes(activeQuestion),
        'Trying to set active question to question that does not exist: %s',
        activeQuestion && activeQuestion.id,
      );
      return {
        ...state,
        activeQuestion,
        inactiveQuestions: action.inactiveQuestions,
      };
    }

    case 'UPDATE_QUESTIONS': {
      // NOTE: Make sure that if we update the questions and delete the
      // active question, we don't keep it as the active question.
      const activeQuestion =
        state.activeQuestion &&
        action.questions.find(q => q.id === state.activeQuestion.id);
      return { ...state, activeQuestion, questions: action.questions };
    }

    case 'RESET_SUBMISSIONS': {
      const midState = { ...state, submissions: action.submissions };
      return {
        ...midState,
        activeSubmissionID: calculateActiveSubmissionID(midState),
      };
    }

    case 'UPSERT_SUBMISSION': {
      const { submission } = action;
      const submissions = { ...state.submissions, [submission.id]: submission };
      const midState = { ...state, submissions };
      return {
        ...midState,
        activeSubmissionID: calculateActiveSubmissionID(midState),
      };
    }
  }
  return state;
}

function calculateActiveSubmissionID(state: State): Submission | null {
  const { activeQuestion } = state;
  if (!activeQuestion) {
    return null;
  }
  for (let id in state.submissions) {
    if (state.submissions.hasOwnProperty(id)) {
      const submission = state.submissions[id];
      if (submission.questionRef.refID === activeQuestion.id) {
        return submission.id;
      }
    }
  }
  return null;
}
