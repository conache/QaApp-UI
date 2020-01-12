import React, { Component, Fragment } from 'react';
import { NotificationContainer } from 'react-notifications';
import { Route, Redirect, Switch } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import HomePage from './home/HomePage';
import Dashboard from './dashboard/Dashboard';
import LandingPage from './landing/LandingPage';
import { UserContext } from '../context';
import CompanyRegisterInfo from './company/company-register-info/CompanyRegisterInfo';
import CompanyDashboard from './company/company-dashboard/CompanyDashboard';
import Navbar from './navbar/Navbar';

class App extends Component {
  render() {
    const { user } = this.props;
    const userIsCompanyAdmin = true;

    return (
      <Fragment>
        <Navbar/>
          <UserContext.Provider value={user}>
            <NotificationContainer />
            <Switch>
              <PrivateRoute
                exact
                path="/company-info"
                component={CompanyRegisterInfo}
                hasPermission={userIsCompanyAdmin}
              />
              <Route
                exact
                path="/landing"
                component={LandingPage}
              />
              <PrivateRoute
                exact
                path="/home"
                component={HomePage}
                hasPermission={true}
              />
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
                hasPermission={true}
              />
              <PrivateRoute 
                exact
                path="/"
                render={() => <Redirect to="/home" />} 
                hasPermission={true}
                />
              <PrivateRoute
                path="/company-dashboard"
                component={CompanyDashboard}
                hasPermission={userIsCompanyAdmin}
              />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </UserContext.Provider>
      </Fragment>
    );
  }
}

export default App;
