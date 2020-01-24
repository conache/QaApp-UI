import React from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import moment from "moment-mini";
import { Button, Modal, Fade } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import PostAnswer from "./PostAnswer";
import Answers from "./Answers";
import UpDownVotes from "./UpDownVotes";
import Subscribe from "./Subscribe";
import PaginatedComponent from "../shared/PaginatedComponent";
import {withUser} from "../../context";
import { pathOr } from "ramda";

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      subscribed: false,
      showModal: false,
      page: 0,
      pageSize: 5,
      questionId: match.params.id
    };
  }

  componentDidMount() {
    const {
      actions: { loadQuestionById }
    } = this.props;
    loadQuestionById(this.state.questionId);
    this.loadAnswers();
  }

  loadAnswers() {
    const { page, pageSize, questionId } = this.state;
    const {
      actions: { getAnswers }
    } = this.props;
    getAnswers({
      page,
      pageSize,
      questionId
    });
  }

  onAnswersPageChange(page) {
    this.setState({ page }, () => this.loadAnswers());
  }

  onPostAnswerSuccess() {
    this.setState({ page: 0 }, () => this.loadAnswers());
  }

  handleSubscribe = value => {
    const {
      actions: { subscribe }
    } = this.props;
    this.setState({ subscribed: value });
  };

  showModal = showModal => {
    this.setState({ showModal });
  };
  
  render() {
    const {
      currentQuestion: { loading, question },
      currentAnswers: { loadingAnswers, answers }
    } = this.props;
    const { showModal, subscribed, page, pageSize, questionId } = this.state;

    let totalAnswersCount = 0;
    let displayedAnswers = [];

    if (!question || loading) {
      return <LoadingSpinner />;
    }

    if (answers) {
      totalAnswersCount = pathOr(0, ["totalCount"], answers);
      displayedAnswers = pathOr([], ["data"], answers);
    }

    const {
      modelId,
      score,
      questionTitle,
      questionText,
      questionTags,
      questionPublishDate,
      questionAuthorName
    } = question;

    return (
      <div className="question-page h-100">
        <div className="d-flex">
          <Subscribe subscribed={subscribed} onClick={this.handleSubscribe} />
          <div>
            <h2 className>{questionTitle}</h2>
            <p>
              asked on {moment(questionPublishDate).format("MMM Do YY")} by{" "}
              <b>{questionAuthorName}</b>
            </p>
            <div className="horizontal-hr" />
          </div>
        </div>
        <div className="d-flex">
          <UpDownVotes
            nrVotes={score}
            className="align-center d-flex flex-column"
            style={{ textAlign: "center" }}
          />
          <div className="py-1">{questionText}</div>
        </div>
        <div className="d-flex ml-72">
          {questionTags?.map(tag => (
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

        <div className="paginated-answers-container d-flex flex-column">
          <PaginatedComponent
            label="answers"
            count={totalAnswersCount}
            page={page}
            pageSize={pageSize}
            onPageChange={page => this.onAnswersPageChange(page)}
            loading={loadingAnswers}
            noDataMessage={
              "No answers found for this question. Be the first who answers!"
            }
          >
            <Answers
              questionId={questionId}
              answers={displayedAnswers}
              onAnswerDelete={() => this.loadAnswers()}
            />
          </PaginatedComponent>
        </div>
        <PostAnswer
          questionId={questionId}
          onSuccess={() => this.onPostAnswerSuccess()}
        />

        <Modal
          open={showModal}
          onClose={() => this.showModal(false)}
          className="modal"
        >
          <Fade in={showModal}>
            <div className="modal-body">
              <div>
                Here will goes the modal for the edit button and later for the
                proposed edit button.
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default withUser(QuestionPage);
