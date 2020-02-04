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
  const [playing, toggleAudio] = useAudio('https://r2---sn-4g5edns7.googlevideo.com/videoplayback?expire=1580696211&ei=My43Xu6_H4fs8wT9hRw&ip=154.9.175.93&id=o-AF1MprvoYUVVMIQ-b3Nx7YyK9ogZAzaJdJAYQXSMuDv8&itag=249&source=youtube&requiressl=yes&vprv=1&mime=audio%2Fwebm&gir=yes&clen=1910265&dur=278.021&lmt=1540860018948199&fvip=2&keepalive=yes&fexp=23842630&c=WEB&txp=5411222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=ALgxI2wwRQIgXyZTFMC8iw1vK8MkJ7fkifbGh7p4uOTYamuXUKy7WrACIQCzVPHgXjDuSyUwh_EXP1fiJOxSXBsElzEzL3YvBLSWqQ==&ratebypass=yes&redirect_counter=1&cm2rm=sn-p5qkz7l&req_id=e691febb6be7a3ee&cms_redirect=yes&mip=2a02:2f0a:b009:dc00:4d0:9a46:5a26:9e62&mm=34&mn=sn-4g5edns7&ms=ltu&mt=1580674605&mv=u&mvi=1&pl=36&lsparams=mip,mm,mn,ms,mv,mvi,pl&lsig=AHylml4wRQIgA_NPeNXE-pzjsAhh0Us-g7_5WCZlIiX8ScKREAeUVvsCIQCzcZAXsqkaXZMYsqHfDcthCiQgFlCoVGpYSSjHGlZYkg%3D%3D');

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
