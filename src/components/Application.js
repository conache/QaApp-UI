import React, { Fragment, Component } from "react";
import { NotificationContainer } from "react-notifications";
import { Route, Redirect, Switch } from "react-router-dom";
import { withKeycloak } from "@react-keycloak/web";

import PrivateRoute from "./utils/PrivateRoute";
import HomePage from "./home/HomePage";
import Dashboard from "./dashboard/Dashboard";
import LandingPage from "./landing/LandingPage";
import { UserContext } from "../context";
import CompanyRegisterInfo from "./company/company-register-info/CompanyRegisterInfo";
import CompanyDashboard from "./company/company-dashboard/CompanyDashboard";
import Navbar from "./shared/navbar/Navbar";
import { getAuthToken } from '../session';
import LoadingSpinner from "./shared/LoadingSpinner";

class App extends Component {
  componentWillMount() {
    const {
      actions: { appLoading },
    } = this.props;

    if (!this.hasToken()) {
      appLoading();
    }
  }

  shouldComponentUpdate(nextProps, _) {
    const {
      actions: { getUserInfo },
      loading,
    } = this.props;

    if (loading !== nextProps.loading && this.hasToken()) {
      getUserInfo();
      return true;
    }
    return false;
  }

  hasToken = () => {
    const token = getAuthToken();
    return token !== null && token !== undefined;
  }

  render() {
    const {
      keycloak,
      user,
      loading,
    } = this.props;

    if (loading) {
      return <LoadingSpinner />;
    }

    const userIsCompanyAdmin = true;
    const userIsAuthenticated = keycloak.authenticated;

    return (
      <Fragment>
        <UserContext.Provider value={user}>
          {userIsAuthenticated && <Navbar />}
          <NotificationContainer />
          <main>
            <Switch>
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
                path="/dashboard"
                component={Dashboard}
                hasPermission={userIsAuthenticated}
              />
              <PrivateRoute
                exact
                path="/"
                render={() => <Redirect to="/home" />}
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

export default withKeycloak(App);
