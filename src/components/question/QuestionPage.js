import React from "react";
import LoadingSpinner from "../shared/LoadingSpinner";
import moment from "moment-mini";
import PostAnswer from "./PostAnswer";
import Answers from "./Answers";
import UpDownVotes from "./UpDownVotes";
import Subscribe from "./Subscribe";
import PaginatedComponent from "../shared/PaginatedComponent";
import { withUser } from "../../context";
import { pathOr } from "ramda";
import EditableText from "../shared/questions/EditableText";
import EntityOptions from "../shared/questions/EntityOptions";
import InactiveOverlay from "../shared/InactiveOverlay";
import CustomMenu from "../shared/questions/CustomMenu";

const ALL_QUESTIONS_ROUTE = "/dashboard/all-questions";
class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      page: 0,
      pageSize: 5,
      questionId: match.params.id,
      editingEnabled: false,
      editLoading: false,
      deleteLoading: false
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

  handleSubscribe(value) {
    const {
      actions: { subscribeToQuestion }
    } = this.props;
    const { questionId } = this.state;

    subscribeToQuestion({ subscribe: value, questionId });
  }

  handleEditSubmit(newQuestionText) {
    const { questionId } = this.state;
    const {
      actions: { editQuestion }
    } = this.props;
    this.setState({ editLoading: true });
    editQuestion({ modelId: questionId, questionText: newQuestionText })
      .then(() => {
        this.setState({ editingEnabled: false });
      })
      .finally(() => {
        this.setState({ editLoading: false });
      });
  }

  handleDeleteClick() {
    const { questionId } = this.state;
    const {
      history,
      actions: { deleteQuestion }
    } = this.props;

    this.setState({ deleteLoading: true });
    deleteQuestion(questionId)
      .then(() => {
        history.push(ALL_QUESTIONS_ROUTE);
      })
      .finally(() => {
        this.setState({ deleteLoading: false });
      });
  }

  vote(isUpVote) {
    const { questionId } = this.state;
    const {
      actions: { voteQuestion }
    } = this.props;
    voteQuestion({
      questionId,
      isUpVote
    });
  }

  hasVotingAccess() {
    const {
      currentUser,
      currentQuestion: { question }
    } = this.props;

    return question?.questionAuthorId !== currentUser.getId();
  }

  render() {
    const {
      currentQuestion: { loading, question },
      currentAnswers: { loadingAnswers, answers }
    } = this.props;
    const {
      page,
      pageSize,
      questionId,
      editingEnabled,
      editLoading,
      deleteLoading
    } = this.state;

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
      subscribed,
      voteStatus,
      questionTitle,
      questionText,
      questionTags,
      questionPublishDate,
      questionAuthorName
    } = question;

    return (
      <div className="question-page h-100 position-relative">
        {deleteLoading && <InactiveOverlay />}
        <div className="d-flex">
          <Subscribe
            subscribed={subscribed}
            onClick={value => this.handleSubscribe(value)}
          />
          <div>
            <h2 className>{questionTitle}</h2>
            <p>
              asked on {moment(questionPublishDate).format("MMM Do YY")} by{" "}
              <b>{questionAuthorName}</b>
            </p>
            <div className="horizontal-hr" />
          </div>
        </div>
        <div className="d-flex position-relative">
          <UpDownVotes
            className="align-center d-flex flex-column"
            style={{ textAlign: "center" }}
            disabled={!this.hasVotingAccess()}
            nrVotes={score}
            vote={voteStatus}
            onUpVote={() => this.vote(true)}
            onDownVote={() => this.vote(false)}
          />
          {editLoading && <LoadingSpinner />}
          <EditableText
            isEditing={editingEnabled}
            content={questionText}
            onEditCancel={() => this.setState({ editingEnabled: false })}
            onEditSubmit={newText => this.handleEditSubmit(newText)}
          />
          <CustomMenu 
            disabled={editingEnabled}
            options={[
              {
                label: "Propose edit",
                icon: "chat_bubble_outline_icon",
                onClick: () => {},
                visible: true
              },
              {
                label: "Edit",
                icon: "edit",
                onClick: () => this.setState({ editingEnabled: true }),
                visible: true
              },
              {
                label: "Delete",
                icon: "delete",
                onClick: () => this.handleDeleteClick(),
                visible: true
              }
            ]}
          />
        </div>
        <div className="d-flex ml-72">
          {questionTags?.map(tag => (
            <div className="tag">{tag}</div>
          ))}
        </div>

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
              question={question}
              answers={displayedAnswers}
              onAnswerDelete={() => this.loadAnswers()}
            />
          </PaginatedComponent>
        </div>
        <PostAnswer
          questionId={questionId}
          onSuccess={() => this.onPostAnswerSuccess()}
        />
      </div>
    );
  }
}

export default withUser(QuestionPage);
