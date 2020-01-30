import React from 'react';
import { useHistory } from "react-router-dom";
import moment from 'moment-mini';

const ProposalCard = props => {
  const { key, proposal} = props;
  const history = useHistory();

  if (!proposal) {
    return null;
  }

  // TODO: modify field names depending on the api
  const { modelId, questionTitle, proposedDate, proposedAuthorUsername } = proposal;

  return (
    <div className="question-card d-flex" key={key} >
      <div className="question-card__body" onClick={() => history.push(`proposed-edits/${modelId}`)}>
        <div className="card-info">proposed on {moment(proposedDate).format("MMM Do 'YY")} by <b>{proposedAuthorUsername}</b></div>
        <div className="title">{questionTitle}</div>
      </div>
    </div>
  );
}

export default ProposalCard;