import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Menu, MenuItem } from '@material-ui/core';

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

const HelpMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [playing, toggleAudio] = useAudio('https://r2---sn-4g5edns7.googlevideo.com/videoplayback?expire=1580696211&ei=My43Xu6_H4fs8wT9hRw&ip=154.9.175.93&id=o-AF1MprvoYUVVMIQ-b3Nx7YyK9ogZAzaJdJAYQXSMuDv8&itag=249&source=youtube&requiressl=yes&vprv=1&mime=audio%2Fwebm&gir=yes&clen=1910265&dur=278.021&lmt=1540860018948199&fvip=2&keepalive=yes&fexp=23842630&c=WEB&txp=5411222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=ALgxI2wwRQIgXyZTFMC8iw1vK8MkJ7fkifbGh7p4uOTYamuXUKy7WrACIQCzVPHgXjDuSyUwh_EXP1fiJOxSXBsElzEzL3YvBLSWqQ==&ratebypass=yes&redirect_counter=1&cm2rm=sn-p5qkz7l&req_id=e691febb6be7a3ee&cms_redirect=yes&mip=2a02:2f0a:b009:dc00:4d0:9a46:5a26:9e62&mm=34&mn=sn-4g5edns7&ms=ltu&mt=1580674605&mv=u&mvi=1&pl=36&lsparams=mip,mm,mn,ms,mv,mvi,pl&lsig=AHylml4wRQIgA_NPeNXE-pzjsAhh0Us-g7_5WCZlIiX8ScKREAeUVvsCIQCzcZAXsqkaXZMYsqHfDcthCiQgFlCoVGpYSSjHGlZYkg%3D%3D');

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <HelpOutlineIcon className="help-icon" aria-controls="help-menu" aria-haspopup="true" onClick={handleClick} />
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
        <MenuItem onClick={toggleAudio}>Help</MenuItem>
        <MenuItem onClick={toggleAudio}>Legendary Badges</MenuItem>
      </Menu>
    </div>
  )
}

export default HelpMenu;
