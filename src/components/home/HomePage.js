import React from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Sidebar from '../shared/Sidebar';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick = () => {
    NotificationManager.error('This is a test error');
  }

  render() {
    return (
      <div className="home-page h-100 d-flex">
        <Sidebar />
        <div>
          <h3>HomePage page</h3>
          <button onClick={() => this.handleClick()}>print error</button>
          <Link to="/company-dashboard">Admin dashboard</Link>
        </div>
      </div>);
  }
}

export default HomePage;

