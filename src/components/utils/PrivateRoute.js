import React, { Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { isAuthenticated, redirectTo = "/" } = props;

  return (
    <Fragment>
      {isAuthenticated && <Route {...props} />}
      {!isAuthenticated && <Redirect
        to={{
          pathname: redirectTo,
        }}
      />}
    </Fragment>
  )
}

export default PrivateRoute;