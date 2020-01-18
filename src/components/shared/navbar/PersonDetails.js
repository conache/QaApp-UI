import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { withUser } from '../../../context';
import { pathOr } from 'ramda';

const PersonDetails = (props) => {
  let { currentUser } = props;
  const  firstName = pathOr('Surname', ['firstname'], currentUser);
  const  lastName = pathOr('Name', ['lastName'], currentUser);

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