import React from "react";
import { connect } from "react-redux";
import UpDownVotes from "./UpDownVotes";
import { voteAnswer } from "../../ducks/answers";

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  vote(upvote) {
    const {
      answer,
      actions: { voteAnswer }
    } = this.props;
    voteAnswer({
      modelId: answer.modelId,
      upvote
    });
  }

  render() {
    const { answer, key } = this.props;
    const {
      answerText,
      publishDate,
      userId,
      userName,
      correctAnswer,
      score,
      modelId
    } = answer;

    return (
      <div className="answer w-100 d-flex" key={key}>
        <UpDownVotes
          small
          classContainer="container-center d-flex flex-column"
          nrVotes={score}
          onUpVote={() => this.vote(true)}
          onDownVote={() => this.vote(false)}
        />
        <div className="d-flex flex-column w-100">
          <div className="answer-text">{answerText}</div>
          <div className="horizontal-hr" />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      voteAnswer: params => {
        return dispatch(voteAnswer(params));
      }
    }
  };
}

export default connect(null, mapDispatchToProps)(Answer);
