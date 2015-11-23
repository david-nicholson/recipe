import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import app from './reducers';
import TheApp from './containers/the-app';

let store = createStore(app);

render(
  <Provider store={store}>
    <TheApp />
  </Provider>,
  document.getElementById('container')
);
