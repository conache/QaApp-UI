import React from 'react';
import { connect } from 'react-redux';
import {newAppError} from '../../ducks/app';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="home-page"> HomePage page </div>
    );
  }
}

export default connect(
  null,
  {newAppError},
)(HomePage);

