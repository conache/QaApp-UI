import React from 'react';
import { connect } from 'react-redux';
import { pathOr } from "ramda";

import { DEFAULT_PAGE_SIZE } from '../utils/Constants';
import { getEditProposals } from '../../ducks/proposals';
import PaginatedComponent from "../shared/PaginatedComponent";
import ProposalCard from './ProposalCard';

class EditProposals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    const { actions: { getEditProposals } } = this.props;
    const { page, pageSize } = this.state;

    getEditProposals(page, pageSize);
  }

  onPageChange(page) {
    this.setState({ page }, () => this.loadData());
  }

  render() {
    const { page, pageSize } = this.state;
    const { proposals, totalCount, loading } = this.props;

    return (
      <PaginatedComponent
        label="edit proposals"
        count={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={page => this.onPageChange(page)}
        loading={loading}
      >
        {proposals.map((proposal, idx) => (
          <ProposalCard proposal={proposal} key={idx} />
        ))}
      </PaginatedComponent>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: pathOr(false, ["proposals", "loadingAllProposals"], state),
    proposals: pathOr([], ["proposals", "data"], state),
    totalCount: pathOr(0, ["proposals", "totalCount"], state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getEditProposals: (page, pageSize) => {
        return dispatch(getEditProposals(page, pageSize));
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProposals);

