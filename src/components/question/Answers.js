import React from 'react';
import Answer from './Answer';

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