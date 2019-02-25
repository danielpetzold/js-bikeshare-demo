import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import NoAccess from './components/NoAccess/NoAccess';

const routes = (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route path="*" component={NoAccess} />
  </Switch>
);

export default routes;
