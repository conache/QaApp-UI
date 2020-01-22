import React from 'react';
import PropTypes from 'prop-types';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import classnames from 'classnames';
import { IconButton } from '@material-ui/core';

const voteType = {
  UPVOTE: "UPVOTE",
  DOWNVOTE: "DOWNVOTE"
}

const UpDownVotes = ({ nrVotes, onUpVote, onDownVote, vote, small, classContainer, style }) => {
  const clsName = small ? 'small-size' : 'normal-size';

  return (
    <div className={classnames("votes-container", classContainer)} style={style}>
      <IconButton disabled={ voteType.UPVOTE === vote } onClick={onUpVote}>
        <ArrowUpwardIcon/>
      </IconButton>
      <div className={classnames(clsName, "container-center d-flex flex-column")}>
        <div>{nrVotes}</div>
        <div>VOTES</div>
      </div>
      <IconButton disabled={ voteType.DOWNVOTE === vote } onClick={onDownVote}>
        <ArrowDownwardIcon />
      </IconButton> 
    </div>
  )
}

export default UpDownVotes;


UpDownVotes.propTypes = {
  nrVotes: PropTypes.number,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  small: PropTypes.bool,
  classContainer: PropTypes.string,
  style: PropTypes.string,
};

UpDownVotes.defaultProps = {
  nrVotes: 0,
  vote: null,
  onUpVote: () => { },
  onDownVote: () => { },
  small: false,
  classContainer: '',
};
