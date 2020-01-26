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
  const { modelId, questionTitle, questionText, questionPublishDate, questionAuthorName } = proposal;

  return (
    <div className="question-card d-flex" key={key} >
      <div className="question-card__body" onClick={() => history.push(`proposed-edits/${modelId}`)}>
        <div className="title">{questionTitle}</div>
        <div className="body">{questionText}</div>
        <div className="card-info">proposed on {moment(questionPublishDate).format("MMM Do 'YY")} by {questionAuthorName}</div>
      </div>
    </div>
  );
}

export default ProposalCard;