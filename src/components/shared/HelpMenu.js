import React, { useState, useEffect } from 'react';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Menu, MenuItem } from '@material-ui/core';
import GeneralModal from './GeneralModal';
import { BADGES } from "../utils/Constants";

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const BadgesList = () => {
  const getBadgeDescription = (badgeInfo) => {
    if (badgeInfo.minScore === 0) {
      return "No answer marked as correct.";
    }

    if (badgeInfo.maxScore === Infinity) {
      return `At least ${badgeInfo.minScore} answers marked as correct.`;
    }

    return `Between ${badgeInfo.minScore} and ${badgeInfo.maxScore} correct answers.`;
  }
  
  return BADGES.map(badge => {
    return (
      [<div className="d-flex w-100 badge">
        <div className="flex-column badge-logo">
          <div className="font-bold label">{badge.label}</div>
          <img src={badge.icon} alt="" style={{width: "5rem"}}/>
        </div>
        <div className="w-100 badge-description">
          {getBadgeDescription(badge)}
        </div>
      </div>,
      <div className="horizontal-hr" />]
    )
  });
}

const HelpMenu = ({on}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBadgesLegendButtonClick = () => {
    setShowModal(true)
    setAnchorEl(null);
  }

  return (
    <div>
      <HelpOutlineIcon className="help-icon cursor-pointer" aria-controls="help-menu" aria-haspopup="true" onClick={handleClick} />
      <Menu
        id="help-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <MenuItem>Help</MenuItem>
        <MenuItem onClick={() => handleBadgesLegendButtonClick()}>Legendary Badges</MenuItem>
      </Menu>
      <GeneralModal
          name="badges-legend-modal"
          showModal={showModal}
          closeModalFct={() => setShowModal(false)}>
          <div className="badges-legend">
            <div className="h-100 w-100">
              <h2>LEGENDARY BADGES</h2>
              <BadgesList />
            </div>
          </div>
        </GeneralModal>
    </div>
  )
}

export default HelpMenu;
