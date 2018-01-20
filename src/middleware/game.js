/* @flow */

import { listenToQuestions } from '../models/Question';

import type { Game } from '../models/Game';
import type { PureAction, ReduxStore, State as ReduxState } from '../store';
import type { Question, Subscription } from '../models/Question';

export type Action = Action$UpdateQuestions;

type Action$UpdateQuestions = {|
  +questions: Array<Questions>,
  +type: 'UPDATE_QUESTIONS',
|};

export default (store: ReduxStore) => (next: Function) => {
  let questionSubscription: Subscription | null = null;
  let activeGame: Game | null = null;

  return (action: PureAction) => {
    next(action);

    const game = getGame(store.getState());
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
    }
  };
};

function getGame(state: ReduxState): Game | null {
  return state.gameState.game;
}

function equalGames(g1: Game | null, g2: Game | null): bool {
  if (!g1 || !g2) {
    return g1 === g2;
  }
  return g1.id === g2.id;
}

function onChangeQuestions(next: Function, questions: Array<Question>): void {
  console.log('QUESTIONS:', questions.length);
}
