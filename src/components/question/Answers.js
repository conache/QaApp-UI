import React from "react";
import Answer from "./Answer";
const Answers = ({ answers, question, onAnswerDelete }) => {
  return (
    <div className="answers-container">
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
