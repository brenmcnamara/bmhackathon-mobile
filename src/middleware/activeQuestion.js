/* @flow */

import type { PureAction, ReduxStore } from '../store';

export type Action = Action$UpdateActiveQuestion;

type Action$UpdateActiveQuestion = {|
  +activeQuestion: Question | null,
  +inactiveQuestions: Array<Question>,
  +type: 'UPDATE_ACTIVE_AND_INACTIVE_QUESTION',
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
    const activeQuestion = getActiveQuestion(questions);
    const inactiveQuestions = getInactiveQuestions(questions);
    next({
      activeQuestion,
      inactiveQuestions,
      type: 'UPDATE_ACTIVE_AND_INACTIVE_QUESTION',
    });
    const nextUpdateMillis = getNextUpdateMillis(questions);
    if (nextUpdateMillis !== null) {
      timer = setTimeout(watch, nextUpdateMillis);
    }
  }

  watch();

  return () => {
    clearTimeout(timer);
  };
}

function getActiveQuestion(questions: Array<Question>): Question | null {
  const nowMillis = Date.now();
  for (let question of questions) {
    const startMillis = question.askAt.getTime();
    const endMillis = startMillis + question.timeLimit * 1000;
    if (startMillis <= nowMillis && endMillis > nowMillis) {
      return question;
    }
  }
  return null;
}

function getNextUpdateMillis(questions: Array<Question>): number | null {
  // We need to update either when a new question is becoming active or a
  // currently active question is becoming inactive.
  // We are assuming there is only 1 active question at a time.
  let soonestUpdate = Infinity;
  const nowMillis = Date.now();
  for (let question of questions) {
    const startMillis = question.askAt.getTime();
    const endMillis = startMillis + question.timeLimit * 1000;
    const deltaToStart = startMillis - nowMillis;
    const deltaToEnd = endMillis - nowMillis;
    if (deltaToStart > 0 && deltaToStart < soonestUpdate) {
      soonestUpdate = deltaToStart;
    } else if (deltaToEnd > 0 && deltaToEnd < soonestUpdate) {
      soonestUpdate = deltaToEnd;
    }
  }
  return soonestUpdate === Infinity ? null : soonestUpdate;
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
