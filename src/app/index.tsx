// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import App from "./App";
//
// const rootEl = document.getElementById("app");
// ReactDOM.render(
//     <App />,
//     rootEl
// );


import * as React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'

let store = createStore(todoApp)

let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
