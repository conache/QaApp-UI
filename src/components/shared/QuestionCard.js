import React from 'react';
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { toUpper } from 'ramda';
import moment from 'moment-mini';

const Numbers = ({ number, text, style }) => {
  return (
    <div className="numbers container-center flex-column" style={style}>
      <div>{number}</div>
      <div>{toUpper(text)}</div>
    </div>
  )
}

const QuestionCard = props => {
  const { key, question, history, showAuthor } = props;

  if (!question) {
    return null;
  }

  const { modelId, score, noAnswers, questionTitle, questionText, questionTags, questionPublishDate, questionAuthorName } = question;
  return (
    <div className="question-card d-flex" key={key} >
      <div className="question-card__head">
        <Numbers number={score} text="votes" style={{ paddingBottom: '25px' }} />
        <Numbers number={noAnswers} text="answers" />
      </div>
      <div className="question-card__body" onClick={() => history.push(`question/${modelId}`)}>
        <div className="title">{questionTitle}</div>
        <div className="body">{questionText}</div>
        <div className="d-flex">{questionTags?.map(tag => <div className="tag">{tag}</div>)}</div>
        <div className="card-info">{`asked on ${moment(questionPublishDate).format("MMM Do 'YY")}`} {showAuthor && `by ${questionAuthorName}`}</div>
      </div>
    </div>
  );
}

QuestionCard.prototype = {
  questions: PropTypes.array.isRequired,
  showAuthor: PropTypes.bool
};

QuestionCard.defaultProps = {
  showAuthor: true
};


export default withRouter(QuestionCard);
