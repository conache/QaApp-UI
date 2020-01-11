import React from 'react';
import { connect } from 'react-redux';
import {newAppError} from '../../ducks/app';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick() {
    const {newAppError} = this.props;
    newAppError({message: "This is a test error"});
  }

  render() {
    return ( 
      <div className="home-page"> 
        <h3>HomePage page</h3> 
        <button onClick={() => this.handleClick()}>print error</button>
        <Link to="/dashboard">Admin dashboard</Link>
      </div>);
  }
}

export default connect(
  null,
  {newAppError},
)(HomePage);

