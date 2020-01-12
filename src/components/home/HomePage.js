import React from 'react';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import LoadingSpinner from '../shared/LoadingSpinner';

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
      <div className="home-page"> 
        <h3>HomePage page</h3> 
        <button onClick={() => this.handleClick()}>print error</button>
        <Link to="/company-dashboard">Admin dashboard</Link>
        <LoadingSpinner />
      </div>);
  }
}

export default HomePage;

