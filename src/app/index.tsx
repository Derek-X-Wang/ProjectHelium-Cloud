import * as React from 'react'
import { render } from 'react-dom'
import { Store, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import rootReducer from './reducers'
import { Todo } from './model'

const initialState = {};

const store = createStore(rootReducer, initialState);

let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
