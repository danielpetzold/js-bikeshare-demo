import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ViewReport from './components/ViewReport/ViewReport';

const routes = (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/reports" component={ViewReport} />
  </Switch>
);

export default routes;
