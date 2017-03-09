import * as React from 'react';
import { Route, IndexRoute, browserHistory, Router } from 'react-router';

import Welcome from './components/Welcome';
import Log from './components/Log';
import App from './components/App';
import Content from './components/Content'

const routes:any = (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route component={Content}>
        <Route path="/" component={Welcome} />
        <Route path="log" component={Log} />
      </Route>
    </Route>
  </Router>
);

export default routes;
