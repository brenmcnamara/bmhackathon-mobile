/* @flow */

import { Component } from 'react';

export type Props = {
  intervalMillis: number,
  render: () => *,
};

type State = {
  count: number,
};

export default class RefreshOnInterval extends Component<Props, State> {
  state: State = { count: 1 };

  _intervalID: number | null = null;

  componentDidMount(): void {
    console.log(this.props.intervalMillis);
    // NOTE: RE-rendering this component with a different interval will lead
    // to incorrect behavior (maintains only initial interval).
    this._intervalID = setInterval(() => {
      this.setState({
        count: (this.state.count + 1) % 100,
      });
    }, this.props.intervalMillis);
  }

  componentWillUnmount(): void {
    if (this._intervalID) {
      clearInterval(this._intervalID);
      this._intervalID = null;
    }
  }

  render() {
    return this.props.render();
  }
}
