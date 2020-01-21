import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const Subscribe = (props) => {
  const subscribe = (param) => {
    const { onClick } = props;
    onClick(param);
  }

  const { subscribed } = props;
  return (
    <Fragment>
      {!subscribed && <StarBorderIcon className="star-icon" onClick={() => subscribe(true)} />}
      {subscribed && <StarIcon className="star-icon colored-star" onClick={() => subscribe(false)} />}
    </Fragment>
  );
}

Subscribe.propTypes = {
  handleClick: PropTypes.func.isRequired,
  canSubscribe: PropTypes.bool,
};

Subscribe.defaultProps = {
  canSubscribe: true,
};

export default Subscribe;