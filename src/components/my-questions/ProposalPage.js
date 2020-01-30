import React from "react";
import TextDiff from "../shared/TextDiff";
import LoadingSpinner from "../shared/LoadingSpinner";
import { Button, Grid } from '@material-ui/core';
import classnames from 'classnames';

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
      <div className="proposal">
        {this.state.loading && <LoadingSpinner />}
        <div className="proposal-header">
          <div>
            <div className="page-title">Review your question</div>
            <small>proposed by X X</small>
          </div>
          <div className="btns-box">
            <Button className="h-100 main-color-background" onClick={() => this.onAcceptClicked()}>
              Accept proposal
            </Button>
            <Button className="h-100 red-button" style={{ marginLeft: '1rem' }} onClick={() => this.onDeclineClicked()}>
              Reject
            </Button>
          </div>
        </div>
        <h2>{question.questionTitle}</h2>
        <TextDiff
          oldText={question.questionText}
          newText={proposal.questionText}
        />
        {/* <div>
          {tags.map(tag => {
            let tagClass = "";

            if (question.questionTags.indexOf(tag) >= 0) {
              tagClass = proposal.questionTags.indexOf(tag) < 0 ? "tag__removed" : "tag";
            } else {
              tagClass = "tag__new";
            }

            return <div className={tagClass}>{tag}</div>
          })}
        </div> */}
        <Grid container spacing={3} className="py-1">
          <Grid item xs={6}>
            <div className="d-flex">
              {tags.map(tag => {
                let tagClass;

                if (question.questionTags.indexOf(tag) >= 0) {
                  tagClass = classnames('tag', {
                    "tag__removed": proposal.questionTags.indexOf(tag) < 0,
                  })
                } else {
                  return null;
                }

                return <div className={tagClass}>{tag}</div>
              })}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="d-flex">
              {tags.map(tag => {
                if (question.questionTags.indexOf(tag) < 0) {
                  return <div className="tag__new tag">{tag}</div>
                } 
                return null;
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProposalPage;
