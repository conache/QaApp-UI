import React from 'react';
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

class QuestionCard extends React.Component {
  render() {
    const { key, question, history } = this.props;

    if (!question) {
      return null;
    }

    const { modelId, score, answers, questionTitle, questionText, questionTags, questionPublishDate, questionAuthorName } = question;
    return (
      <div className="question-card d-flex" key={key} >
        <div className="question-card__head">
          <Numbers number={score} text="votes" style={{ paddingBottom: '35px' }} />
          <Numbers number={Math.floor(Math.random() * 100)} text="answers" />
        </div>
        <div className="question-card__body">
          <div className="title" onClick={() => history.push(`question/${modelId}`)}>{questionTitle}</div>
          <div className="body">{questionText}</div>
          <div className="d-flex">{questionTags?.map(tag => <div className="tag">{tag}</div>)}</div>
          <div className="card-info">asked on {moment(questionPublishDate).format("MMM Do YY")} by {questionAuthorName}</div>
        </div>
      </div>
    );
  }
}


export default withRouter(QuestionCard);
