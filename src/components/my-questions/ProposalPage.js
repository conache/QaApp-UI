import React from "react";
import TextDiff from "../shared/TextDiff";
import LoadingSpinner from "../shared/LoadingSpinner";

const USER_QUESTIONS_BASE_URL = "/dashboard/my-questions";
class ProposalPage extends React.Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.state = {
      loading: false,
      proposalId: match.params.id
    };
  }

  componentDidMount() {
    const {
      actions: { getProposal }
    } = this.props;
    getProposal(this.state.proposalId);
  }

  onDeclineClicked() {
    const {
      history,
      actions: { declineProposal }
    } = this.props;
    const { currentProposal: { question } } = this.props;

    this.setState({ loading: true });
    declineProposal(this.state.proposalId)
      .then(() => {
        history.replace(`${USER_QUESTIONS_BASE_URL}/proposed-edits`)
      })
      .finally(() => {
        this.setState({ loading: false });
      })
  }

  onAcceptClicked() {
    const {
      history,
      actions: { acceptProposal }
    } = this.props;
    const { currentProposal: { question } } = this.props;

    this.setState({ loading: true });
    acceptProposal(this.state.proposalId)
      .then(() => {
        history.replace(`${USER_QUESTIONS_BASE_URL}/question/${question.modelId}`)
      })
      .finally(() => {
        this.setState({ loading: false });
      })
  }

  render() {
    const { loadingProposal, currentProposal } = this.props;

    if (loadingProposal || !currentProposal) {
      return <LoadingSpinner />;
    }
    const { question, proposal } = currentProposal;
    const tags = question.questionTags.concat(
      proposal.questionTags.filter(
        tag => question.questionTags.indexOf(tag) < 0
      )
    );

    return (
      <div style={{ height: "100%", width: "100%", position: "relative" }}>
        {this.state.loading && <LoadingSpinner />}
        <div>{question.questionTitle}</div>
        <TextDiff
          oldText={question.questionText}
          newText={proposal.questionText}
        />
        <div>
          {tags.map(tag => {
            let tagClass = "";

            if (question.questionTags.indexOf(tag) >= 0) {
              tagClass = proposal.questionTags.indexOf(tag) < 0 ? "tag__removed" : "tag";
            } else {
              tagClass = "tag__new";
            }

            return <div className={tagClass}>{tag}</div>
          })}
        </div>
        <div>
          <button onClick={() => this.onDeclineClicked()}>Decline</button>
          <button onClick={() => this.onAcceptClicked()}>Accept</button>
        </div>
      </div>
    );
  }
}

export default ProposalPage;
