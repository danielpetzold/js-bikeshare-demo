import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ViewReport from "./pages/ViewReport/ViewReport";
import AdHoc from "./pages/AdHoc/AdHoc";

// @ts-ignore
// Allows access to route only if token exists
const PrivateRoute = ({ component: Component, ...rest }) => {
  let user = localStorage.getItem("user") as any;
  return (
    <Route
      {...rest}
      render={props =>
        user !== null && JSON.parse(user).token !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
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
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute path="/reports" component={ViewReport} />
    <PrivateRoute path="/reports/edit/:path" component={AdHoc} />
  </Switch>
);

export default routes;
