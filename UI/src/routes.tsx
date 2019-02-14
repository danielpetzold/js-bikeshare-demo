import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './components/Login';

const routes = (
  <Switch>
    <Route exact path="/" component={Login} />
  </Switch>
);

export default routes;
