/* @flow */

export type State = {
  showLeaderBoard: bool,
};

const DEFAULT_STATE = {
  showLeaderBoard: false,
};

export default function leaderBoard(
  state: State = DEFAULT_STATE,
  action: PureAction,
): State {
  switch (action.type) {
    case 'UPDATE_LEADER_BOARD': {
      return { ...state, showLeaderBoard: action.show };
    }
  }
  return state;
}
