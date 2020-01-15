import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Sidebar from '../../shared/Sidebar';
import AllQuestions from '../../shared/questions/AllQuestions';

class Dashboard extends React.Component {
  render() {
    const { match } = this.props;

    return (
      <div className="dashboard d-flex h-100">
        <Sidebar>
          <NavLink to={`${match.url}/all-questions`} className="item" activeClassName="selected-item">
            All questions
            </NavLink>
          <NavLink to={`${match.url}/my-questions`} className="item" activeClassName="selected-item">
            My questions
            </NavLink>
        </Sidebar>
        <section className="h-100 w-100 overflow-y">
          <Switch>
            <Route path={`${match.path}/all-questions`} component={AllQuestions} />
            <Route path={`${match.path}/my-questions`} component={AllQuestions} />
            <Route component={AllQuestions} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default Dashboard;
