import React, { Component, Fragment } from 'react';
import { NotificationContainer } from 'react-notifications';
import { Route, Redirect, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import CompanyDashboard from './company-dashboard/CompanyDashboard';
import NotFoundPage from './not-found/NotFoundPage';

class App extends Component {
  render() {
    return (
     <Fragment>
       <NotificationContainer />
       <main>
       <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route
              exact
              path="/home"
              component={HomePage}
            />
          <Route
            path="/company-dashboard"
            component={CompanyDashboard}
          />
          <Route component={NotFoundPage} />
        </Switch>
       </main>
     </Fragment>
    );
  }
}

export default App;
