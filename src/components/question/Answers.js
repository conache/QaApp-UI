import React from "react";
import Answer from "./Answer";
const Answers = ({ answers, questionId, onAnswerDelete }) => {
  return (
    <div className="answers-container">
      {/* The up-down vote width is 72px */}
      {/*<div style={{ marginLeft: '72px' }}>
        <div className="subtitle">{nrAnswers} answers</div>
        <div className="horizontal-hr" />
  </div>*/}
      {answers.map((answer, idx) => (
        <Answer questionId={questionId} answer={answer} key={idx} onDelete={onAnswerDelete}/>
      ))}
    </div>
  );
};

export default Answers;
