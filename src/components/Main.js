import { Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import ApplicationContainer from './ApplicationContainer';
import { bindActionCreators } from 'redux';
import { setAuthToken } from '../session';
import { KeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { loaded, loading } from '../ducks/app';
import { loadingProfileUser } from '../ducks/user';
import socketService from '../socketService';

const keycloak = new Keycloak('/keycloak.json');
const kyecloakInitConfig = {
  onLoad: 'check-sso'
}

class Main extends Component {

  onKeycloakTokens = tokens => {
    const { token } = tokens;
    const { actions: { appLoaded } } = this.props;
    setAuthToken(token);
    appLoaded();
  }

  onKeycloakEvent = event => {
    const { actions: { appLoading, loadingProfile } } = this.props;

    if (event === 'onAuthSuccess') {
      appLoading();
      loadingProfile();
    }
  }
 
  renderApp() {
    return (
      <KeycloakProvider
        keycloak={keycloak}
        initConfig={kyecloakInitConfig}
        onTokens={this.onKeycloakTokens}
        onEvent={this.onKeycloakEvent}
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
      appLoading: loading,
      loadingProfile: loadingProfileUser,
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
