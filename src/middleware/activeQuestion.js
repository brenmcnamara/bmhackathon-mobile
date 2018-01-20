/* @flow */

import type { PureAction, ReduxStore } from '../store';

export type Action = Action$UpdateActiveQuestion;

type Action$UpdateActiveQuestion = {|
  +activeQuestion: Question | null,
  +type: 'UPDATE_ACTIVE_QUESTION',
|};

type Subscription = Function;

export default (store: ReduxStore) => (next: Function) => {
  let questionSubscription: Subscription | null = null;

  return (action: PureAction) => {
    next(action);

    switch (action.type) {
      case 'UPDATE_QUESTIONS': {
        questionSubscription && questionSubscription();
        questionSubscription = watchQuestions(
          next,
          store.getState().gameState.activeQuestion,
          action.questions,
        );
        break;
      }
    }
  };
};

function watchQuestions(
  next: Function,
  initialActiveQuestion: Question | null,
  questions: Array<Question>,
): Subscription {
  let timer = null;
  let activeQuestion: Question | null = initialActiveQuestion;

  function watch() {
    const payload = getActiveQuestionPayload(questions);
    if (!payload) {
      if (activeQuestion) {
        next({
          activeQuestion: null,
          type: 'UPDATE_ACTIVE_QUESTION',
        });
      }
      return;
    }

    const { next: nextQuestion } = payload;
    if (
      payload.timeUntilActive === 'ALREADY_RUNNING' &&
      nextQuestion !== activeQuestion
    ) {
      activeQuestion = nextQuestion;
      next({
        activeQuestion: payload.next,
        type: 'UPDATE_ACTIVE_QUESTION',
      });
    } else {
      const timeoutMillis =
        payload.timeUntilActive === 'ALREADY_RUNNING'
          ? payload.timeUntilInactive
          : payload.timeUntilActive;
      timer = setTimeout(watch, timeoutMillis);
    }
  }

  watch();

  return () => {
    clearTimeout(timer);
  };
}

function getActiveQuestionPayload(
  questions: Array<Question>,
): {
  next: Question,
  timeUntilActive: number | 'ALREADY_RUNNING',
  timeUntilInactive: number,
} | null {
  for (let question of questions) {
    if (question.isCanceled) {
      continue;
    }
    const startMillis = question.askAt.getTime();
    const endMillis = question.askAt.getTime() + question.timeLimit * 1000;
    const nowMillis = Date.now();
    if (nowMillis < startMillis) {
      return {
        next: question,
        timeUntilActive: startMillis - nowMillis,
        timeUntilInactive: endMillis - nowMillis,
      };
    } else if (nowMillis < endMillis) {
      return {
        next: question,
        timeUntilActive: 'ALREADY_RUNNING',
        timeUntilInactive: endMillis - nowMillis,
      };
    }
  }
  return null;
}