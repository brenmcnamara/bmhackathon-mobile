/* @flow */

import invariant from 'invariant';

import type { Game } from '../models/Game';
import type { PureAction } from '../store';
import type { Question } from '../models/Question';

export type State = {
  +activeQuestion: Question | null,
  +game: Game | null,
  +questions: Array<Question>,
};

const DEFAULT_STATE = {
  activeQuestion: null,
  game: null,
  questions: [],
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
      return { ...state, activeQuestion };
    }

    case 'UPDATE_QUESTIONS': {
      // NOTE: Make sure that if we update the questions and delete the
      // active question, we don't keep it as the active question.
      const activeQuestion =
        state.activeQuestion &&
        action.questions.find(q => q.id === state.activeQuestion.id);
      return { ...state, activeQuestion, questions: action.questions };
    }
  }
  return state;
}
