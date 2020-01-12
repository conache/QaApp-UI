import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { useKeycloak } from '@react-keycloak/web'

import Application from './Application';
import { pathOr } from 'ramda';
import LoadingSpinner from './shared/LoadingSpinner';

function mapStateToProps(state) {
  return {
    app: state.app,
    // user: pathOr({}, ['user', 'profile'], state);
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      // loadDataUser: getUserInfo,
    }, dispatch),
  };
}

const ApplicationContainer = () => {
  //  this hook can be called only in function components
  const [, initialized] = useKeycloak()

  if (!initialized) {
    return <LoadingSpinner />
  }

  return <Application />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationContainer);
