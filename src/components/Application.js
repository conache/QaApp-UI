import React, { Component } from 'react';
import { NotificationContainer } from 'react-notifications';
import { Route, Redirect, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import Dashboard from './dashboard/Dashboard';
import LandingPage from './landing/LandingPage';
import { getToken, setToken } from '../session';
import { UserContext } from '../context';
// import PrivateRoute from './utils/PrivateRoute';
import CompanyRegisterInfo from './company/company-register-info/CompanyRegisterInfo';
import CompanyDashboard from './company/company-dashboard/CompanyDashboard';
import NotFoundPage from './not-found/NotFoundPage';

class App extends Component {
 
  componentWillMount() {
    const token = getToken();
    if (token) {
      // Load Data User - get with user data and store it in redux
      // getCurrentUSer action: this.props.actions.loadDataUser
    } else {
      setToken();
    }
  }

  isUsserLoggedIn = () => {
    const token = getToken();
    return token ? true : false;
  }

  render() {
    const { user } = this.props;

    return (
     <UserContext.Provider value={user}>
       <NotificationContainer />
       <Switch>
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route
          exact
          path="/home"
          component={HomePage}
        />
        <Route
          exact
          path="/landing"
          component={LandingPage}
        />
        <Route
          exact
          path="/dashboard"
          component={Dashboard}
        />
        {/* <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={this.isUsserLoggedIn()}
          redirectTo="/"
        /> */}
        <Route
          exact
          path="/company-info"
          component={CompanyRegisterInfo}
        />
        <Route
          path="/company-dashboard"
          component={CompanyDashboard}
        />
        <Route component={NotFoundPage} />
       </Switch>
     </UserContext.Provider>
    );
  }
}

export default App;
