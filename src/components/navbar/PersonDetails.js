import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { withUser } from '../../context';

const PersonDetails = (props) => {
  let { currentUser } = props;

  return (
    <div className="person-details">
      <div className="details">
        <h4>{currentUser.getName()}</h4>
        <div>{currentUser.getDisplayRole()}</div>
      </div>
      <PersonIcon className="profile-picture" />
    </div>
  )
}

export default withUser(PersonDetails);