/* @flow */

export type Action = Action$UpdateLeaderBoard;

type Action$UpdateLeaderBoard = {|
  +show: bool,
  +type: 'UDPATE_LEADER_BOARD',
|};

export function updateLeaderBoard(show: bool) {
  return {
    show,
    type: 'UPDATE_LEADER_BOARD',
  };
}
