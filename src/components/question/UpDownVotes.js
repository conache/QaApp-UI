import React from 'react';
import PropTypes from 'prop-types';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import classnames from 'classnames';

const UpDownVotes = ({ nrVotes, onUpVote, onDownVote, small, classContainer, style }) => {
  const clsName = small ? 'small-size' : 'normal-size';

  return (
    <div className={classnames("votes-container", classContainer)} style={style}>
      <ArrowUpwardIcon onClick={onUpVote} className="cursor-pointer" />
      <div className={classnames(clsName, "container-center d-flex flex-column")}>
        <div>{nrVotes}</div>
        <div>VOTES</div>
      </div>
      <ArrowDownwardIcon onClick={onDownVote} className="cursor-pointer" />
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
  onUpVote: () => { },
  onDownVote: () => { },
  small: false,
  classContainer: '',
};
