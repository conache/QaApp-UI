import React from "react";
import { connect } from "react-redux";
import { IconButton, TextareaAutosize, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import UpDownVotes from "./UpDownVotes";
import {
  voteAnswer,
  deleteAnswer,
  emptyDeletedAnswer
} from "../../ducks/answers";
import { pathOr } from "ramda";
import EditAnswerForm from "./EditAnswerForm";
import {withUser} from "../../context";

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      actions: { deleteAnswer }
    } = this.props;
    deleteAnswer(answer.modelId);
  }

  onEditButtonClick() {
    this.setState({ editing: true });
  }

  componentDidUpdate() {
    const {
      deletedAnswer,
      answer,
      actions: { emptyDeleted }
    } = this.props;

    if (deletedAnswer === answer.modelId) {
      // this.props.onDelete(deletedAnswer);
      emptyDeleted();
    }
  }

  render() {
    const { answer, key, currentUser } = this.props;
    const { editing } = this.state;

    const {
      answerText,
      publishDate,
      userId,
      userName,
      correctAnswer,
      score,
      voteStatus,
      modelId
    } = answer;

    return (
      <div className="answer w-100 d-flex" key={key}>
        <UpDownVotes
          small
          classContainer="container-center d-flex flex-column"
          disabled={userId === currentUser.id}
          nrVotes={score}
          vote={voteStatus}
          onUpVote={() => this.vote(true)}
          onDownVote={() => this.vote(false)}
        />
        <div className="d-flex flex-column w-100">
          {editing && (
            <EditAnswerForm
              answer={answer}
              onCancel={() => this.setState({ editing: false })}
              onSuccess={() => this.setState({ editing: false})}
              />
          )}
          {!editing && <div className="answer-text">{answerText}</div>}
          <div className="horizontal-hr" />
        </div>
        <div>
          <IconButton disabled={editing} onClick={() => this.onDeleteClick()}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            disabled={editing}
            onClick={() => this.setState({ editing: true })}>
            <EditIcon />
          </IconButton>
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
      voteAnswer: params => {
        return dispatch(voteAnswer(params));
      },
      deleteAnswer: id => {
        return dispatch(deleteAnswer(id));
      },
      // HACK
      emptyDeleted: () => dispatch(emptyDeletedAnswer())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withUser(Answer));
