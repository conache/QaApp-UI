import React from "react";
import { connect } from "react-redux";
import UpDownVotes from "./UpDownVotes";
import { voteAnswer, deleteAnswer, editAnswer } from "../../ducks/answers";
import { pathOr } from "ramda";
import { withUser } from "../../context";
import InactiveOverlay from "../shared/InactiveOverlay";
import EntityOptions from "./EntityOptions";
import EditableText from "../shared/questions/EditableText";
import LoadingSpinner from "../shared/LoadingSpinner";

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
      questionId,
      answer,
      actions: { voteAnswer }
    } = this.props;
    voteAnswer({
      answerId: answer.modelId,
      questionId,
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
      }).finally(() => {
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
      this.setState({loading: false});
    });
  }

  render() {
    const { answer, key, currentUser } = this.props;
    const { editing, inactive, loading } = this.state;
    const { answerText, userId, score, voteStatus } = answer;

    return (
      <div className="answer w-100 d-flex position-relative" key={key}>
        {inactive && <InactiveOverlay />}
        {loading && <LoadingSpinner />}
        <UpDownVotes
          small
          classContainer="container-center d-flex flex-column"
          disabled={userId === currentUser.id || loading || inactive}
          nrVotes={score}
          vote={voteStatus}
          onUpVote={() => this.vote(true)}
          onDownVote={() => this.vote(false)}
        />
        <div className="d-flex flex-column w-100">
          <EditableText
            isEditing={editing}
            content={answerText}
            onEditCancel={() => this.setState({ editing: false })}
            onEditSubmit={newText => this.handleEditSubmit(newText)}
          />
          <EntityOptions
            disabled={editing}
            onEditClick={() => this.setState({ editing: true })}
            onDeleteClick={() => this.onDeleteClick()}
          />
          <div className="horizontal-hr" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deletedAnswer: pathOr(null, ["answers", "deletedAnswerId"], state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      voteAnswer: params => dispatch(voteAnswer(params)),
      deleteAnswer: id => dispatch(deleteAnswer(id)),
      editAnswer: params => dispatch(editAnswer(params))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withUser(Answer));
