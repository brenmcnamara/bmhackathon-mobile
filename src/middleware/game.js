/* @flow */

import { genSubmissions, genUpsertSubmission } from '../models/Submission';
import { listenToQuestions } from '../models/Question';

import type { Game } from '../models/Game';
import type { ID } from '../models/types';
import type { PureAction, ReduxStore, State as ReduxState } from '../store';
import type { Question, Subscription } from '../models/Question';

export type Action = Action$UpdateQuestions | Action$ResetSubmissions;

type Action$UpdateQuestions = {|
  +questions: Array<Questions>,
  +type: 'UPDATE_QUESTIONS',
|};

type Action$ResetSubmissions = {|
  +submissions: { [id: ID]: Submission },
  +type: 'RESET_SUBMISSIONS',
|};

export default (store: ReduxStore) => (next: Function) => {
  let questionSubscription: Subscription | null = null;
  let activeGame: Game | null = null;
  let didLoadSubmissions = false;

  function onChangeQuestions(next: Function, questions: Array<Question>): void {
    next({
      questions,
      type: 'UPDATE_QUESTIONS',
    });
  }

  return (action: PureAction) => {
    next(action);

    switch (action.type) {
      case 'UPSERT_SUBMISSION': {
        // Upload the submission to Firebase.
        genUpsertSubmission(action.submission);
        break;
      }
    }

    const game = getGame(store.getState());
    const user = getUser(store.getState());

    if (game && user && !didLoadSubmissions) {
      didLoadSubmissions = true;
      genSubmissions(user, game).then(submissions =>
        next({ submissions, type: 'RESET_SUBMISSIONS' }),
      );
    }
    if (equalGames(game, activeGame)) {
      return;
    }
    questionSubscription && questionSubscription();

    activeGame = game;
    if (activeGame) {
      questionSubscription = listenToQuestions(
        activeGame.id,
        (questions: Array<Question>) => onChangeQuestions(next, questions),
      );
    } else {
      next({ questions: [], type: 'UPDATE_QUESTIONS' });
    }
  };
};

function getGame(state: ReduxState): Game | null {
  return state.gameState.game;
}

function getUser(state: ReduxState): User | null {
  return state.authState.loginPayload
    ? state.authState.loginPayload.user
    : null;
}

function equalGames(g1: Game | null, g2: Game | null): bool {
  if (!g1 || !g2) {
    return g1 === g2;
  }
  return g1.id === g2.id;
}
