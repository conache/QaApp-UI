import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import {withUser} from '../../../context';
import Sidebar from '../../shared/Sidebar';
import UsersSection from '../../company/company-dashboard/UsersSection';
import ReportsSection from '../../company/company-dashboard/ReportsSection';
import TagsSectionsContainer from '../../company/company-dashboard/tags/TagsSectionsContainer';
import ProposedTags from '../../company/company-dashboard/tags/ProposedTags';
import QuestionPageContainer from '../../question/QuestionPageContainer';
import { pathOr } from 'ramda';
import AllQuestions from '../../shared/questions/AllQuestions';

class Dashboard extends React.Component {
  isAdminUser() {
    const role = pathOr('ROLE_USER', ['attributes', 'role', '0'], this.props.currentUser);
    return role === 'ROLE_COMPANY_ADMINISTRATOR' || role === 'ROLE_ADMIN';
  }

  render() {
    const { match } = this.props;

    return (
      <div className="dashboard d-flex h-100">
        <Sidebar>
          { this.isAdminUser() && 
            <React.Fragment>
              <NavLink to={`${match.url}/users`} className="item" activeClassName="selected-item">
                Users
                </NavLink>
              <NavLink exact to={`${match.url}/tags`} className="item" activeClassName="selected-item">
                Tags
                </NavLink>
              <NavLink exact to={`${match.url}/tags/proposed`} className="item" activeClassName="selected-item">
                Proposed Tags
                </NavLink>
              <NavLink to={`${match.url}/reports`} className="item" activeClassName="selected-item">
                Reports
                </NavLink>
              </React.Fragment>

          }
            <NavLink exact to={`${match.url}/all-questions`} className="item" activeClassName="selected-item">
              All questions
              </NavLink>
            <NavLink exact to={`${match.url}/my-questions`} className="item" activeClassName="selected-item">
              My questions
            </NavLink>
        </Sidebar>
        <section className="h-100 w-100 overflow-y">
          <Switch>
            <Route path={`${match.path}/users`} component={UsersSection} />
            <Route exact path={`${match.path}/tags`} component={TagsSectionsContainer} />
            <Route exact path={`${match.path}/tags/proposed`} component={ProposedTags} />
            <Route exact path={`${match.path}/reports`} component={ReportsSection} />
            <Route exact path={`${match.path}/all-questions`} component={AllQuestions} />
            <Route exact path={`${match.path}/my-questions`} component={AllQuestions} />
            <Route path={`${match.path}/question/:id`} component={QuestionPageContainer} />
            <Route component={UsersSection} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withUser(Dashboard);
