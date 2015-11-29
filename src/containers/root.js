import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../configure-store';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import Routes from './routes';

import '../scss/main.scss';

const store = configureStore();

// <Router history={createBrowserHistory()}>

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}

export default Root;
