import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import UsersSection from './UsersSection';
import ReportsSection from './ReportsSection';
import TagsSectionsContainer from './tags/TagsSectionsContainer';
import ProposedTags from './tags/ProposedTags';
import Sidebar from '../../shared/Sidebar';

class CompanyDashboard extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div className="company-dashboard d-flex h-100">
        <Sidebar>
          <NavLink to={`${match.url}/users`} className="item" activeClassName="selected-item">
            Users
            </NavLink>
          <NavLink exact to={`${match.url}/tags`} className="item" activeClassName="selected-item">
            Tags
            </NavLink>
          <NavLink exact to={`${match.url}//tags/proposed`} className="item" activeClassName="selected-item">
            Proposed Tags
            </NavLink>
          <NavLink to={`${match.url}/reports`} className="item" activeClassName="selected-item">
            Reports
            </NavLink>
        </Sidebar>
        <section className="h-100 w-100">
          <Switch>
            <Route path={`${match.path}/users`} component={UsersSection} />
            <Route exact path={`${match.path}/tags`} component={TagsSectionsContainer} />
            <Route exact path={`${match.path}/tags/proposed`} component={ProposedTags} />
            <Route path={`${match.path}/reports`} component={ReportsSection} />
            <Route component={UsersSection} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default CompanyDashboard;