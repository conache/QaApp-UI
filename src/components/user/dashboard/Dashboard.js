import React from 'react';
import Sidebar from '../../shared/Sidebar';
import { NavLink } from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { match } = this.props;

    return (
      <div className="dashboard d-flex h-100">
        <Sidebar>
          <NavLink to={`${match.url}/all-questions`} className="item" activeClassName="selected-item">
            All questions
            </NavLink>
          <NavLink exact to={`${match.url}/my-questions`} className="item" activeClassName="selected-item">
            My questions
            </NavLink>
          <NavLink exact to={`${match.url}/tags`} className="item" activeClassName="selected-item">
            Tags
            </NavLink>
        </Sidebar>
        Dashboard page
      </div>
    );
  }
}

export default Dashboard;
