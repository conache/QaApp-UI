import { Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import ApplicationContainer from './ApplicationContainer';
import { bindActionCreators } from 'redux';
import { setAuthToken } from '../session';
import { KeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';

import { loaded } from '../ducks/app';

const keycloak = new Keycloak('/keycloak.json');
const kyecloakInitConfig = {
  onLoad: 'check-sso'
}

class Main extends Component {

  onKeycloakTokens = tokens => {
    const { token } = tokens;
    const { actions: { appLoaded } } = this.props
    setAuthToken(token);
    appLoaded();
  }

  renderApp() {
    return (
      <KeycloakProvider
        keycloak={keycloak}
        initConfig={kyecloakInitConfig}
        onTokens={this.onKeycloakTokens}
      >
        <Router>
          <Route component={ApplicationContainer} />
        </Router>
      </KeycloakProvider>
    );
  }

  render() {
    return [
      this.renderApp()
    ];
  }
}

function mapStateToProps(state) {
  return {
    loading: state.app.appLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      appLoaded: loaded,
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
