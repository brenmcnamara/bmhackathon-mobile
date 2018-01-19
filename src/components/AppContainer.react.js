/* @flow */

import App from './App.react';
import React, { Component } from 'react';
import Store from '../store';

import { Provider } from 'react-redux';

export type Props = {};

export default class AppContainer extends Component<Props> {
  render() {
    return (
      <Provider store={Store}>
        <App />
      </Provider>
    );
  }
}
