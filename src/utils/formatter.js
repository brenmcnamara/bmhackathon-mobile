/* @flow */

import invariant from 'invariant';

export function formatPoints(num: number): string {
  invariant(num >= 0, 'This formatted assumes points are always non-negative');
  if (num === 0) {
    return '0';
  }
  const digits = [];
  while (num !== 0) {
    digits.push(num % 10);
    num = Math.floor(num / 10);
  }
  return digits.reduce((str, num, index) => {
    return index !== 0 && index % 3 === 0 ? num + ',' + str : num + str;
  }, '');
}
