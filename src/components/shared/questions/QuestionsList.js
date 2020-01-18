import React from 'react';
import QuestionCard from "./QuestionCard";

class QuestionsList extends React.Component {
  render() {
    let {questions} = this.props;
    questions = questions || [];

    return (
      questions.map((question, idx) => <QuestionCard question={question} key={idx} />)
    );
  }
}

export default QuestionsList;