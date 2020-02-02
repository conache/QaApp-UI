import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import { withUser } from '../../context';
import GeneralPopover from '../shared/GeneralPopover';
import { pathOr } from 'ramda';
import Badge from '../utils/Badges';

const PersonDetails = (props) => {
  let { currentUser } = props;
  const userBadgeScore = pathOr(0, ['_jsonProfile', 'attributes', 'correctAnswers', 0], currentUser);

  return (
    <div className="person-details">
      <div className="details">
        <h4>{currentUser.getName()}</h4>
        <div>{currentUser.getDisplayRole()}</div>
      </div>
      <GeneralPopover
        popoverAnchor={
          <PersonIcon className="profile-picture" />
        }
        popoverId="navbar-badge"
      > 
        <Badge score={userBadgeScore} />
      </GeneralPopover>
    </div>
  )
}

export default withUser(PersonDetails);