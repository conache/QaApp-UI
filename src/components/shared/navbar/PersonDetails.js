import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { withUser } from '../../../context';

const PersonDetails = (props) => {
  // const { currentUser, currentUser: { data: { firstName, lastName } } } = props;
  const { currentUser } = props;

  return (
    <div className="person-details">
      <div className="details">
        {/* <h4>`{lastName} {firstName}`</h4> */}
        <h4>Name Surname</h4>
        <div>Employee role</div>
      </div>
      <PersonIcon className="profile-picture" />
    </div>
  )
}

export default withUser(PersonDetails);