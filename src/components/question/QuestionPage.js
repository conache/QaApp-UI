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
import InactiveOverlay from "../shared/InactiveOverlay";
import CustomMenu from "../all-questions/CustomMenu";
import GeneralModal from "../shared/GeneralModal";
import EditQuestionTemplate from "./EditQuestionTemplate";
import { proposeEditQuestion } from '../../api/questions';
import { NotificationManager } from "react-notifications";
import GeneralPopover from '../shared/GeneralPopover';
import Badge from '../utils/Badges';

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
      deleteLoading: false,
      showEditModal: false,
      showProposeModal: false,
    };
  }

  componentDidMount() {
    const {
      actions: { loadQuestionById, loadTags }
    } = this.props;
    loadQuestionById(this.state.questionId);
    loadTags();
    this.loadAnswers();
  }
  
  loadAnswers() {
    const { page, pageSize, questionId } = this.state;
    const {
      actions: { getAnswers },
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

  handleSubscribe(currentUserSubscribed) {
    const {
      actions: { subscribeToQuestion, unsubscribeToQuestion }
    } = this.props;
    const { questionId } = this.state;
    
    if (currentUserSubscribed) {
      unsubscribeToQuestion(questionId)
    } else {
      subscribeToQuestion(questionId);
    }
  }

  handleEditSubmit(data) {
    const { questionId } = this.state;
    const {
      actions: { editQuestion }
    } = this.props;

    const params = {
      question: {
        modelId: questionId,
        questionText: data.questionText,
        questionTags: data.questionTags,
      },
      proposedTags: data.proposedTags,
    }
    editQuestion(params)
      .then(() => {
        this.setState({ showEditModal: false });
      })
      .finally(() => {
        this.setState({ showEditModal: false });
      });
  }

  handleProposeSubmit = (data) => {
    const { questionId } = this.state;

    const params = {
      question: {
        modelId: questionId,
        questionText: data.questionText,
        questionTags: data.questionTags,
      },
      proposedTags: data.proposedTags,
    }

    proposeEditQuestion(params)
      .then(() => {
        this.setState({ showProposeModal: false });
        NotificationManager.success(
          `Edit question succesfully proposed`
        );
      })
      .catch(err => {
        this.setState({ showProposeModal: false });
        NotificationManager.error(
          `Error encountered while proposing edit. Error: ${err.message}`
        );
      })
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

  showModal = (key, value) => {
    console.log(key, value)
    this.setState({ [key]: value });
  }

  render() {
    const {
      currentQuestion: { loading, question },
      currentAnswers: { loadingAnswers, answers },
      currentUser,
      tagsOptions,
    } = this.props;
    const {
      page,
      pageSize,
      questionId,
      editingEnabled,
      deleteLoading,
      showEditModal,
      showProposeModal,
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
      voteStatus,
      questionTitle,
      questionText,
      questionTags,
      questionPublishDate,
      questionAuthorName,
      userScore,
      currentUserSubscribed,
    } = question;

    return (
      <div className="question-page w-100 overflow-y">
        {deleteLoading && <InactiveOverlay />}
        <div className="d-flex">
          {!currentUser.isQuestionAuthor(question) && 
            <Subscribe
            subscribed={currentUserSubscribed}
            onClick={() => this.handleSubscribe(currentUserSubscribed)}
          />}
          <div className="w-100">
            <h2 className>{questionTitle}</h2>
            <div className="d-flex">
              asked on {moment(questionPublishDate).format("MMM Do YY")} by{" "}
              <GeneralPopover popoverAnchor={(<div className="author-name">{questionAuthorName}</div>)} popoverId="author-question">
                <Badge score={userScore} />
              </GeneralPopover>
            </div>
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
          <div className="py-1 w-100" style={{ textAlign: 'justify' }} >{questionText}</div>
          <CustomMenu
            disabled={editingEnabled}
            options={[
              {
                label: "Propose edit",
                icon: "chat_bubble_outline_icon",
                onClick: () => this.setState({ showProposeModal: true }),
                visible: !currentUser.isQuestionAuthor(question)
              },
              {
                label: "Edit",
                icon: "edit",
                onClick: () => this.setState({ showEditModal: true }),
                visible: currentUser.isQuestionAuthor(question)
              },
              {
                label: "Delete",
                icon: "delete",
                onClick: () => this.handleDeleteClick(),
                visible: currentUser.isCompanyAdmin() || currentUser.isQuestionAuthor(question)
              }
            ]}
          />
        </div>
        <div className="d-flex ml-72">
          {questionTags?.map((tag, idx) => (
            <div className="tag" key={idx}>{tag}</div>
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
              questionNbr={totalAnswersCount}
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

        {/* Modals */}
        <GeneralModal
          name="edit-question"
          showModal={showEditModal}
          closeModalFct={() => this.showModal('showEditModal', false)}
        >
          <EditQuestionTemplate
            modalTitle="EDIT QUESTION"
            question={question}
            tagsOptions={tagsOptions}
            onDiscard={() => this.showModal('showEditModal', false)}
            onSave={(params) => this.handleEditSubmit(params)}
          />
        </GeneralModal>

        <GeneralModal
          name="propose-edit-question"
          showModal={showProposeModal}
          closeModalFct={() => this.showModal('showProposeModal', false)}
        >
          <EditQuestionTemplate
            modalTitle="PROPOSE EDIT QUESTION"
            question={question}
            tagsOptions={tagsOptions}
            onDiscard={() => this.showModal('showProposeModal', false)}
            onSave={(params) => this.handleProposeSubmit(params)}
          />
        </GeneralModal>
      </div>
    );
  }
}

export default withUser(QuestionPage);
