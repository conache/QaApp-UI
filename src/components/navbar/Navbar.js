import React from 'react';
import LogoutButton from '../shared/LogoutButton';

class Navbar extends React.Component {
  render() {
    return(
      <div className="Navbar">
        <div>Navbar</div>
        <LogoutButton />
      </div>
    );
  }
}

export default Navbar;