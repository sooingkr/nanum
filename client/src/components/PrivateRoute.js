import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, requireAuth, ...rest}) => (
  <Route
    {...rest}
    render={(props) => requireAuth() === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', }} />
    }
  />
)

export default PrivateRoute;