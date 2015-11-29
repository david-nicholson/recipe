import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configure-store';
import Routes from './routes';

import '../scss/main.scss';

const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default Root;
