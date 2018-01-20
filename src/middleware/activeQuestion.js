/* @flow */

import type { PureAction, ReduxStore } from '../store';

export type Action = Action$UpdateActiveQuestion;

type Action$UpdateActiveQuestion = {|
  +activeQuestion: Question | null,
  +inactiveQuestions: Array<Question>,
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

  function watch() {
    const payload = getActiveQuestionPayload(questions);
    if (!payload) {
      next({
        activeQuestion: null,
        inactiveQuestions: getInactiveQuestions(questions),
        type: 'UPDATE_ACTIVE_QUESTION',
      });
      return;
    }

    const { next: nextQuestion } = payload;
    if (payload.timeUntilActive === 'ALREADY_RUNNING') {
      next({
        activeQuestion: nextQuestion,
        inactiveQuestions: getInactiveQuestions(questions),
        type: 'UPDATE_ACTIVE_QUESTION',
      });
    }
    const timeoutMillis =
      payload.timeUntilActive === 'ALREADY_RUNNING'
        ? payload.timeUntilInactive
        : payload.timeUntilActive;
    timer = setTimeout(watch, timeoutMillis);
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

function getInactiveQuestions(questions: Array<Question>): Array<Question> {
  const nowMillis = Date.now();
  return questions.filter(question => {
    if (question.isCanceled) {
      return true;
    }
    const startMillis = question.askAt.getTime();
    const endMillis = startMillis + question.timeLimit * 1000;
    return nowMillis >= endMillis;
  });
}
