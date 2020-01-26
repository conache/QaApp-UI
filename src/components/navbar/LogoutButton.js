import React from 'react';
import { connect } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';

import { logout } from '../../ducks/user';
import { Button, Box } from '@material-ui/core';

const Logout = (props) => {
  const [keycloak] = useKeycloak();

  const handleLogout = () => {
    keycloak.logout()
    props.logout();
  }
  return (
    <Box px={1}>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => { return dispatch(logout()) }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);