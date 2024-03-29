import React from "react";
import PropTypes from "prop-types";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import classnames from "classnames";
import { IconButton } from "@material-ui/core";
import { VOTE_SATUS } from "../utils/Constants";

const UpDownVotes = ({
  nrVotes,
  onUpVote,
  onDownVote,
  vote,
  disabled,
  small,
  classContainer,
  style
}) => {
  const clsName = small ? "small-size" : "normal-size";

  const onUpVoteClicked = () => {
    if (vote === VOTE_SATUS.UPVOTE) {
      return;
    }
    onUpVote();
  };

  const onDownVoteClicked = () => {
    if (vote === VOTE_SATUS.DOWNVOTE) {
      return;
    }
    onDownVote();
  };

  return (
    <div
      className={classnames("votes-container", classContainer)}
      style={style}
    >
      <IconButton
        disabled={disabled}
        color={vote === VOTE_SATUS.UPVOTE ? "primary" : "default"}
        onClick={onUpVoteClicked}
      >
        <ArrowUpwardIcon />
      </IconButton>
      <div
        className={classnames(clsName, "container-center d-flex flex-column")}
      >
        <div>{nrVotes}</div>
        <div>VOTES</div>
      </div>
      <IconButton
        disabled={disabled}
        color={vote === VOTE_SATUS.DOWNVOTE ? "secondary" : "default"}
        onClick={onDownVoteClicked}
      >
        <ArrowDownwardIcon />
      </IconButton>
    </div>
  );
};

export default UpDownVotes;

UpDownVotes.propTypes = {
  nrVotes: PropTypes.number,
  onUpVote: PropTypes.func,
  onDownVote: PropTypes.func,
  small: PropTypes.bool,
  classContainer: PropTypes.string,
  style: PropTypes.string
};

UpDownVotes.defaultProps = {
  nrVotes: 0,
  vote: null,
  onUpVote: () => {},
  onDownVote: () => {},
  small: false,
  classContainer: ""
};
