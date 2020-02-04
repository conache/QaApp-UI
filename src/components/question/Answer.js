import React from "react";
import { connect } from "react-redux";
import moment from 'moment-mini';
import UpDownVotes from "./UpDownVotes";
import {
  voteAnswer,
  deleteAnswer,
  editAnswer,
  markAsCorrect
} from "../../ducks/answers";
import { withUser } from "../../context";
import InactiveOverlay from "../shared/InactiveOverlay";
import CustomMenu from "../all-questions/CustomMenu";
import EditableText from "../all-questions/EditableText";
import LoadingSpinner from "../shared/LoadingSpinner";
import CheckIcon from '@material-ui/icons/Check';
import GeneralPopover from '../shared/GeneralPopover';
import Badge from '../utils/Badges';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      inactive: false,
      editing: false
    };
  }

  vote(isUpVote) {
    const {
      answer,
      actions: { voteAnswer }
    } = this.props;
    voteAnswer({
      answerId: answer.modelId,
      questionId: answer.questionId,
      isUpVote
    });
  }

  onDeleteClick() {
    const {
      answer,
      onDelete,
      actions: { deleteAnswer }
    } = this.props;
    this.setState({ inactive: true });
    deleteAnswer({ answerId: answer.modelId, questionId: answer.questionId })
      .then(() => {
        onDelete();
      })
      .finally(() => {
        this.setState({ inactive: false });
      });
  }

  onEditButtonClick() {
    this.setState({ editing: true });
  }

  handleEditSubmit(newAnswerText) {
    const {
      answer,
      actions: { editAnswer }
    } = this.props;

    this.setState({ loading: true });
    editAnswer({
      questionId: answer.questionId,
      modelId: answer.modelId,
      answerText: newAnswerText
    })
      .then(() => {
        this.setState({ editing: false });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  markAsCorrect() {
    const {
      answer,
      actions: { markAnswerAsCorrect }
    } = this.props;
    const params = {
      answerId: answer.modelId,
      questionId: answer.questionId,
    }
    // TODO: Update in store so that wont be necesarry to refresh the answers!!
    markAnswerAsCorrect(params);
  }

  render() {
    const { answer, key, currentUser, questionAuthorId, questionId } = this.props;
    const { editing, inactive, loading } = this.state;
    const { answerText, score, voteStatus, correctAnswer, userName, publishDate, userScore } = answer;

    return (
      <div className="answer w-100 d-flex position-relative" key={key}>
        {inactive && <InactiveOverlay />}
        {loading && <LoadingSpinner />}
        <UpDownVotes
          small
          classContainer="container-center d-flex flex-column"
          disabled={currentUser.isAnswerAuthor(answer)}
          nrVotes={score}
          vote={voteStatus}
          onUpVote={() => this.vote(true)}
          onDownVote={() => this.vote(false)}
        />
        <div className="d-flex flex-column w-100">
          <div className="d-flex h-100">
            {correctAnswer && !editing && <CheckIcon className="correct-answer" />}
            <div className="py-1 w-100 answer__content">
              <EditableText
                isEditing={editing}
                content={answerText}
                onEditCancel={() => this.setState({ editing: false })}
                onEditSubmit={newText => this.handleEditSubmit(newText)}
              />
              {!editing && (
                <div className="answer__data-info">
                  on {moment(publishDate).format("MMM Do YY")} by{" "}
                  {
                    <GeneralPopover popoverAnchor={(<div className="author-name">{userName}</div>)} popoverId="author-question">
                      <Badge score={userScore} />
                    </GeneralPopover>
                  }
                </div>
              )}
            </div>
            {!editing && (
              <CustomMenu
                options={[
                  {
                    label: "Mark as correct",
                    icon: "playlist_add_check_icon",
                    onClick: () => this.markAsCorrect(),
                    visible: currentUser.isQuestionAuthor({ questionAuthorId }) && !answer.correctAnswer
                  },
                  {
                    label: "Edit",
                    icon: "edit",
                    onClick: () => this.setState({ editing: true }),
                    visible: currentUser.isAnswerAuthor(answer)
                  },
                  {
                    label: "Delete",
                    icon: "delete",
                    onClick: () => this.onDeleteClick(),
                    visible: currentUser.isCompanyAdmin() || currentUser.isAnswerAuthor(answer)
                  }
                ]}
              />
            )}
          </div>

          <div className="horizontal-hr" />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      voteAnswer: params => dispatch(voteAnswer(params)),
      deleteAnswer: params => dispatch(deleteAnswer(params)),
      editAnswer: params => dispatch(editAnswer(params)),
      markAnswerAsCorrect: params => dispatch(markAsCorrect(params))
    }
  };
}

export default connect(null, mapDispatchToProps)(withUser(Answer));
