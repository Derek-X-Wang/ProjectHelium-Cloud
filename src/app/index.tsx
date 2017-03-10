import * as React from 'react';
import { render } from 'react-dom';
import { Store, createStore } from 'redux';
import { Provider } from 'react-redux';
import Root from './Root';
import rootReducer from './reducers';
import socket from './socket';

const initialState = {};

const store = createStore(rootReducer, initialState);

socket(store);

let renderView = (Component:any) => {
  render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  )
}

renderView(Root);
