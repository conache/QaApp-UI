import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import { KeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import store from './store';

import './index.scss';
import 'react-notifications/lib/notifications.css';

import Main from './components/Main.js';
import {setAuthToken} from './session';
import {getUserInfo} from './ducks/user';

const keycloak = new Keycloak('/keycloak.json');
const kyecloakInitConfig = {
  onLoad: 'check-sso'
} 

const onKeycloakEvent = (event, error) => {
  switch (event) {
    case 'onTokenExpired':
      setAuthToken(null);
    case 'onAuthLogout':
      setAuthToken(null);
  }
}

const onKeycloakTokens = tokens => {
  const {token} = tokens;
  setAuthToken(token);
}

ReactDOM.render(
  (
    <KeycloakProvider
        keycloak={keycloak}
        initConfig={kyecloakInitConfig}
        onEvent={onKeycloakEvent}
        onTokens={onKeycloakTokens}
      >
        <Provider store={store}>
          <Main />
        </Provider>
      </KeycloakProvider>
  ), document.getElementById('root'));

serviceWorker.unregister();
