import React from 'react';
import { connect } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';

import { logout } from '../../ducks/user';

const Logout = (props) => {
  const [keycloak] = useKeycloak();

  const handleLogout = () => {
    keycloak.logout()
    props.logout();
  }
  return (
    <div>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
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