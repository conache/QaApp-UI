import React from 'react';
import LogoutButton from '../shared/LogoutButton';
import {withUser} from '../../context';

class Navbar extends React.Component {
  render() {
    console.log(this.props);
    return(
      <div className="Navbar">
        <div>Navbar</div>
        <LogoutButton />
      </div>
    );
  }
}

export default withUser(Navbar);