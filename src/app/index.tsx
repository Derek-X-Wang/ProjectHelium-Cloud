import * as React from 'react';
import { render } from 'react-dom';
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import rootReducer from './reducers';
import { Todo } from './model';
import socket from './socket';

const initialState = {};

const store = createStore(rootReducer, initialState);

socket(store);

let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
