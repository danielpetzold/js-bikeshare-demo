import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import DriverDashboard from './pages/DriverDashboard/DriverDashboard';
import Repository from './pages/Repository/Repository';
import ViewReport from './pages/ViewReport/ViewJasperReport';
import ViewAdhoc from './pages/Adhoc/ViewAdhoc';
import EditAdhoc from './pages/Adhoc/EditAdhoc';
import ViewDashboard from './pages/DashboardManagement/ViewDashboard';
import EditDashboard from './pages/DashboardManagement/EditDashboard';
import EmptyPage from './pages/EmptyPage/EmptyPage';

// @ts-ignore
// Allows access to route only if token exists
const PrivateRoute = ({ component: Component, ...rest }) => {
  let user = localStorage.getItem('user') as any;
  return (
    <Route
      {...rest}
      render={props =>
        user !== null && JSON.parse(user).token !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const routes = (
  <Switch>
    <Route exact path="/" component={Login} />
    <PrivateRoute path="/managerDashboard" component={Dashboard} />
    <PrivateRoute path="/driverDashboard" component={DriverDashboard} />
    <PrivateRoute path="/repository" component={Repository} />
    <PrivateRoute exact path="/report" component={ViewReport} />
    <PrivateRoute exact path="/adhoc" component={ViewAdhoc} />
    <PrivateRoute exact path="/adhoc/new" component={EditAdhoc} />
    <PrivateRoute exact path="/adhoc/edit" component={EditAdhoc} />
    <PrivateRoute exact path="/dashboard" component={ViewDashboard} />
    <PrivateRoute exact path="/dashboards/new" component={EditDashboard} />
    <PrivateRoute exact path="/dashboards/edit" component={EditDashboard} />
    <PrivateRoute path="/emptyPage" component={EmptyPage} />
  </Switch>
);

export default routes;
