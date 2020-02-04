import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import {withUser} from '../../../context';
import Sidebar from '../../shared/Sidebar';
import UsersSection from '../../company/company-dashboard/UsersSection';
import TagsSectionsContainer from '../../company/company-dashboard/tags/TagsSectionsContainer';
import ProposedTags from '../../company/company-dashboard/tags/ProposedTags';
import QuestionPageContainer from '../../question/QuestionPageContainer';
import ProposalPageContainer from '../../my-questions/ProposalPageContainer';
import AllQuestions from '../../all-questions/AllQuestions';
import UserQuestions from '../../my-questions/UserQuestions';

class Dashboard extends React.Component {
  render() {
    const { match, currentUser } = this.props;

    return (
      <div className="dashboard d-flex h-100">
        <Sidebar>
          { currentUser?.isCompanyAdmin() && 
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
              </React.Fragment>

          }
            <NavLink exact to={`${match.url}/all-questions`} className="item" activeClassName="selected-item">
              All questions
              </NavLink>
            <NavLink exact to={`${match.url}/my-questions`} className="item" activeClassName="selected-item">
              My questions
            </NavLink>
        </Sidebar>
        <section className="section-container h-100 w-100">
          <Switch>
            <Route path={`${match.path}/users`} component={UsersSection} />
            <Route exact path={`${match.path}/tags`} component={TagsSectionsContainer} />
            <Route exact path={`${match.path}/tags/proposed`} component={ProposedTags} />
            <Route exact path={`${match.path}/all-questions`} component={AllQuestions} />
            <Route exact path={`${match.path}/my-questions/question/:id`} render={(props) => (
              <QuestionPageContainer key={props.match.params.id} {...props} />
            )}/>
            <Route exact path={`${match.path}/my-questions/proposed-edits/:id`} render={(props) => (
              <ProposalPageContainer key={props.match.params.id} {...props} />
            )}/>
            <Route path={`${match.path}/my-questions`} component={UserQuestions} />
            <Route path={`${match.path}/question/:id`} render={(props) => (
              <QuestionPageContainer key={props.match.params.id} {...props} />
            )}/>
            <Redirect to={`${match.path}/all-questions`} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withUser(Dashboard);
