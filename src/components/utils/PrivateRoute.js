import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useKeycloak } from '@react-keycloak/web'

const PrivateRoute = (props) => {
  let { hasPermission, redirectTo } = props;
  const [keycloak] = useKeycloak();

  return (
    keycloak.authenticated && hasPermission ?
      <Route {...props} />
      : (
        <Redirect
          to={{
            pathname: redirectTo,
          }}
        />
      )
  );
}

PrivateRoute.prototype = {
  hasPermission: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string,
}

PrivateRoute.defaultProps = {
  redirectTo: '/landing'
}

export default PrivateRoute;