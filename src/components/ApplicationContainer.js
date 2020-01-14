import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { useKeycloak } from '@react-keycloak/web'

import Application from './Application';
import { pathOr } from 'ramda';
import LoadingSpinner from './shared/LoadingSpinner';
import { getUserInfo } from '../ducks/user';
import { loading } from '../ducks/app';

function mapStateToProps(state) {
  return {
    app: state.app,
    loading:  pathOr({}, ['app', 'appLoading'], state),
    user: pathOr({}, ['profile'], state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getUserInfo: getUserInfo,
      appLoading: loading,
    }, dispatch),
  };
}

const ApplicationContainer = (props) => {
  //  this hook can be called only in function components
  const [, initialized] = useKeycloak()

  if (!initialized) {
    return <LoadingSpinner />
  }

  return <Application {...props} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationContainer);
