import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import UsersSection from './UsersSection';
import ReportsSection from './ReportsSection';
import TagsSectionsContainer from './tags/TagsSectionsContainer';

class CompanyDashboard extends React.Component {
  render() {
    const {match} = this.props;
    
    return (
      <div className="company-dashboard">
        <div>Company dashboard</div>
        <ul>
          <li>
            <Link to={`${match.url}/users`}>Users</Link>
          </li>
          <li>
            <Link to={`${match.url}/tags`}>Tags</Link>
          </li>
          <li>
            <Link to={`${match.url}/reports`}>Reports</Link>
          </li>
        </ul>
        <section>
          <Switch>
            <Route path={`${match.path}/users`} component={UsersSection}/>
            <Route path={`${match.path}/tags`} component={TagsSectionsContainer}/>
            <Route path={`${match.path}/reports`} component={ReportsSection}/>
            <Route component={UsersSection}/>
          </Switch>
        </section>
      </div>
    );
  }
}

export default CompanyDashboard;