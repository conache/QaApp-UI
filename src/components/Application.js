import React, { Component, Fragment } from 'react';
import { NotificationContainer } from 'react-notifications';
import { Route, Redirect } from 'react-router-dom';
import HomePage from './home/HomePage';

class App extends Component {
  render() {
    return (
     <Fragment>
       <NotificationContainer />
       <main>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route
            exact
            path="/home"
            component={HomePage}
          />
       </main>
     </Fragment>
    );
  }
}

export default App;
