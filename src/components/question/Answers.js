import React from "react";
import Answer from "./Answer";
const Answers = ({ answers, question, onAnswerDelete, questionNbr }) => {
  return (
    <div className="answers-container">
      {questionNbr > 0 && (
        <div style={{ marginLeft: '72px' }}>
          <div className="subtitle">{questionNbr} answers</div>
          <div className="horizontal-hr" />
        </div>
      )}
      {answers.map((answer, idx) => (
        <Answer
          questionAuthorId={question?.questionAuthorId}
          questionId={question?.modelId}
          answer={answer}
          key={idx}
          onDelete={onAnswerDelete}
        />
      ))}
    </div>
  );
};

export default Answers;
