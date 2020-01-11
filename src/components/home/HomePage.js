import React from 'react';
import { connect } from 'react-redux';
import {newAppError} from '../../ducks/app';
import { NotificationManager } from 'react-notifications';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick = () => {
    const {newAppError} = this.props;
    newAppError({message: "This is a test error"});
    NotificationManager.error('This is a test error');
  }

  render() {
    return (
      <div className="home-page"> HomePage page </div>,
      <button onClick={() => this.handleClick()}>print error</button>
    );
  }
}

export default connect(
  null,
  {newAppError},
)(HomePage);

