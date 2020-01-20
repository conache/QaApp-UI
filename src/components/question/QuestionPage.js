import React from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';

class QuestionPage extends React.Component {
  componentDidMount() {
    const { actions: { loadQuestionById }, match } = this.props;
    loadQuestionById(match.params.id);
  }

  render() {
    const { currentQuestion: { loading, question } } = this.props;
    if (loading) {
      return <LoadingSpinner />
    }

    // const { modelId, score, answers, questionTitle, questionText, questionTags, questionPublishDate, questionAuthorName } = question;

    return (
      <div className="question-page">
        
      </div>
    )
  }
}

export default QuestionPage;