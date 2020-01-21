import React from 'react';
import LoadingSpinner from '../shared/LoadingSpinner';
import moment from 'moment-mini';
import { Button, Modal, Fade } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PostAnswer from './PostAnswer';
import Answers from './Answers';
import UpDownVotes from './UpDownVotes';
import Subscribe from './Subscribe';

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subscribed: false,
      showModal: false,
    };
  }

  componentDidMount() {
    const { actions: { loadQuestionById, getAnswers }, match } = this.props;
    loadQuestionById(match.params.id);
    getAnswers(match.params.id);
  }

  handleSubscribe = (value) => {
    const { actions: { subscribe } } = this.props;
    // subscribe()
    this.setState({ subscribed: value });
  }

  showModal = (showModal) => {
    this.setState({ showModal });
  }

  render() {
    const { currentQuestion: { loading, question } } = this.props;
    const { showModal, subscribed } = this.state;

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
          <Subscribe
            subscribed={subscribed}
            onClick={this.handleSubscribe}
          />
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
          onClick={() => this.showModal(true)}
        >
          edit
        </Button>

        <Answers nrAnswers={7} answers={listAnswers} />
        <PostAnswer />

        <Modal
          open={showModal}
          onClose={() => this.showModal(false)}
          className="modal"
        >
          <Fade in={showModal}>
            <div className="modal-body">
              <div>
                Here will goes the modal for the edit button and later for the proposed edit button.
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    )
  }
}

export default QuestionPage;

const listAnswers = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus etiam sodales pharetra egestas fames ullamcorper. Dui donec vestibulum morbi odio semper consectetur. Tincidunt vel nam duis pharetra lacus facilisis lectus nulla. Magna proin egestas velit morbi nunc, metus.',
  'Cursus augue vitae ullamcorper feugiat bibendum diam tellus velit, sed. Et augue id sed sem adipiscing odio ante fusce. Suspendisse facilisis nibh vulputate est, molestie elementum nulla. Penatibus enim, faucibus imperdiet arcu bibendum quis. Est quam in ullamcorper curabitur facilisis tristique. Nullam at nulla id eleifend sed rhoncus faucibus arcu. Morbi.',
  'Odio mauris hendrerit nulla pharetra turpis pellentesque venenatis integer diam. Viverra risus nunc quam aliquam. Pellentesque turpis nibh etiam ac nulla. A tristique non, elit pellentesque mauris. Elit fames quis aliquet lorem vehicula eu. Iaculis quam pretium urna risus, ipsum ut. Urna commodo tellus nunc morbi diam quam aliquam. Iaculis at amet vitae id ac.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus etiam sodales pharetra egestas fames ullamcorper. Dui donec vestibulum morbi odio semper consectetur. Tincidunt vel nam duis pharetra lacus facilisis lectus nulla. Magna proin egestas velit morbi nunc, metus.',
  'Cursus augue vitae ullamcorper feugiat bibendum diam tellus velit, sed. Et augue id sed sem adipiscing odio ante fusce. Suspendisse facilisis nibh vulputate est, molestie elementum nulla. Penatibus enim, faucibus imperdiet arcu bibendum quis. Est quam in ullamcorper curabitur facilisis tristique. Nullam at nulla id eleifend sed rhoncus faucibus arcu. Morbi.',
  'Odio',
]