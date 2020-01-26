import React from 'react';

class ProposalPage extends React.Component {
  constructor(props) {
    super(props);
    const {match} = this.props;
    this.state = {
      loading: false,
      proposalId: match.params.id
    }
  }

  render() {
    const {proposalId} = this.state;

    return(
      <div>
        adasdasdasd {proposalId}
      </div>
    )
  }
}

export default ProposalPage;