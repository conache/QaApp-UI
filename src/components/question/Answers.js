import React from 'react';
import UpDownVotes from './UpDownVotes';
import PaginatedComponent from '../shared/PaginatedComponent';

const Answer = ({ answer, key }) => {
  const {answerText, publishDate, userId, userName, correctAnswer, score} = answer;
  return (
    <div className="answer w-100 d-flex" key={key}>
      <UpDownVotes small classContainer="container-center d-flex flex-column" />
      <div className="d-flex flex-column w-100">
        <div className="answer-text">{answerText}</div>
        <div className="horizontal-hr" />
      </div>
    </div>
  )
}

const Answers = ({answers}) => {
  return (
    <div className="answers-container">
      {/* The up-down vote width is 72px */}
      {/*<div style={{ marginLeft: '72px' }}>
        <div className="subtitle">{nrAnswers} answers</div>
        <div className="horizontal-hr" />
  </div>*/}
      {answers.map((answer, idx) => <Answer answer={answer} key={idx} />)}
    </div>
  )
}

export default Answers;