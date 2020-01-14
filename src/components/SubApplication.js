import React, { Fragment, Component } from "react";
import { NotificationContainer } from "react-notifications";
import { Route, Redirect, Switch } from "react-router-dom";
import { pathOr, isEmpty } from 'ramda';
import { connect } from 'react-redux';

import PrivateRoute from "./utils/PrivateRoute";
import HomePage from "./home/HomePage";
import Dashboard from "./dashboard/Dashboard";
import LandingPage from "./landing/LandingPage";
import { UserContext } from "../context";
import CompanyRegisterInfo from "./company/company-register-info/CompanyRegisterInfo";
import CompanyDashboard from "./company/company-dashboard/CompanyDashboard";
import Navbar from "./shared/navbar/Navbar";
import LoadingSpinner from "./shared/LoadingSpinner";
import AskQuestion from "./questions/AskQuestion";

class SubApplication extends Component {
  render() {
    const {
      keycloak,
      userProfile,
    } = this.props;

    if (userProfile.loading) {
      return <LoadingSpinner />;
    }

    const userIsCompanyAdmin = true;
    const userIsAuthenticated = keycloak.authenticated;

    return (
      <Fragment>
        <UserContext.Provider value={userProfile.profile}>
          {userIsAuthenticated && <Navbar />}
          <NotificationContainer />
          <main>
            <Switch>
              <PrivateRoute
                exact
                path="/"
                render={() => <Redirect to="/home" />}
                hasPermission={userIsAuthenticated}
              />
              <PrivateRoute
                exact
                path="/company-info"
                component={CompanyRegisterInfo}
                hasPermission={userIsAuthenticated && userIsCompanyAdmin}
              />
              <Route exact path="/landing" component={LandingPage} />
              <PrivateRoute
                exact
                path="/home"
                component={HomePage}
                hasPermission={userIsAuthenticated}
              />
              <PrivateRoute
                exact
                path="/ask-question"
                component={AskQuestion}
                hasPermission={userIsAuthenticated}
              />
              <PrivateRoute
                exact
                path="/dashboard"
                component={Dashboard}
                hasPermission={userIsAuthenticated}
              />
              <PrivateRoute
                path="/company-dashboard"
                component={CompanyDashboard}
                hasPermission={userIsAuthenticated && userIsCompanyAdmin}
              />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </main>
        </UserContext.Provider>
      </Fragment>
    );
  }
};


function mapStateToProps(state) {
  return {
    userProfile: pathOr(null, ['user'], state),
  };
}

function mapDispatchToProps() {
  return {
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubApplication);
