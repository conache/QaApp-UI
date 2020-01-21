import React from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import moment from 'moment-mini';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PostAnswer from './PostAnswer';
import Answers from './Answers';
import UpDownVotes from './UpDownVotes';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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

    if (!question) {
      return null;
    }

    const { modelId, score, answers, questionTitle, questionText, questionTags, questionPublishDate, questionAuthorName } = question;

    return (
      <div className="question-page h-100">
        <div className="d-flex">
          <StarBorderIcon className="cursor-pointer" style={{ width: '72px' }} />
          <div>
            <h2 className>{questionTitle}</h2>
            <p>asked on {moment(questionPublishDate).format("MMM Do YY")} by <b>{questionAuthorName}</b></p>
            <div className="horizontal-hr" />
          </div>
        </div>
        <div className="d-flex">
          <UpDownVotes
            nrVotes={score}
            className="align-center d-flex flex-column"
            style={{ textAlign: 'center' }}
          />
          <div className="py-1">{questionText}</div>
        </div>
        <div className="d-flex ml-72">
          {questionTags.map(tag => (
            <div className="tag">{tag}</div>
          ))}
        </div>

        <Button
          variant="contained"
          color="primary"
          className="edit-q-button"
          startIcon={<EditIcon />}
        >
          edit
      </Button>

        <Answers nrAnswers={7} />
        <PostAnswer />
      </div>
    )
  }
}

export default QuestionPage;