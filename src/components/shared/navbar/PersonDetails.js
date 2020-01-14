import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { withUser } from '../../../context';

const PersonDetails = (props) => {
  const { currentUser: { firstName, lastName } } = props;

  return (
    <div className="person-details">
      <div className="details">
        <h4>{lastName} {firstName}</h4>
        <div>Employee role</div>
      </div>
      <PersonIcon className="profile-picture" />
    </div>
  )
}

export default withUser(PersonDetails);