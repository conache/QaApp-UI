import React from "react";
import Answer from "./Answer";
const Answers = ({ answers, questionId, onAnswerDelete }) => {
  return (
    <div className="answers-container">
      {answers.map((answer, idx) => (
        <Answer questionId={questionId} answer={answer} key={idx} onDelete={onAnswerDelete}/>
      ))}
    </div>
  );
};

export default Answers;
