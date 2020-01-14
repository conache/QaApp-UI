import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import store from './store';

import './index.scss';
import 'react-notifications/lib/notifications.css';

import Main from './components/Main.js';

ReactDOM.render(
  (
    <Provider store={store}>
      <Main />
    </Provider>
  ), document.getElementById('root'));

serviceWorker.unregister();
