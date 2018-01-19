/* @flow */

import BarcelonaIcon from '../../assets/Barcelona-100x100.png';
import BayernMunichIcon from '../../assets/BayernMunich-100x100.png';

export type Team = {|
  +displayName: string,
  +icon: *,
  +name: string,
|};

export const Teams = {
  BARCELONA: {
    displayName: 'Barcelona',
    icon: BarcelonaIcon,
    name: 'BARCELONA',
  },

  BAYERN_MUNICH: {
    displayName: 'Bayern Munich',
    icon: BayernMunichIcon,
    name: 'BAYERN_MUNICH',
  },
};
