import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

const routes = (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/dashboard" component={Dashboard} />
  </Switch>
);

export default routes;
