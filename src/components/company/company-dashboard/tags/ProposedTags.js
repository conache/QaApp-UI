import React from "react";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import {
  getProposedTags,
  acceptProposedTag,
  declineProposedTag
} from "../../../../ducks/tags";

class ProposedTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [{ title: "Proposed tag", field: "name" }]
    };
    this.tableRef = React.createRef();
  }

  fetchProposedTags = query => {
    const {
      actions: { getProposedTags }
    } = this.props;
    const { page, pageSize } = query;

    return getProposedTags(page, pageSize).then(res => {
      return {
        data: res.content,
        page: res.pageable.pageNumber,
        totalCount: res.totalElements
      };
    });
  };

  refreshTableData() {
    this.tableRef.current && this.tableRef.current.onQueryChange();
  }

  acceptProposedTag = rowData => {
    const {
      actions: { acceptTag }
    } = this.props;

    acceptTag(rowData.id)
      .then(() => this.refreshTableData());
  };

  declineProposedTag = rowData => {
    const {
      actions: { declineTag }
    } = this.props;

    declineTag(rowData.id)
      .then(() => this.refreshTableData());
  };

  render() {
    return (
      <div className="w-100">
        <MaterialTable
          options={{
            exportButton: false,
            search: false,
            pageSize: 10,
            pageSizeOptions: [],
            sorting: true
          }}
          tableRef={this.tableRef}
          title="Proposed Tags"
          columns={this.state.columns}
          data={query => this.fetchProposedTags(query)}
          actions={[
            {
              icon: "check",
              tooltip: "Accept",
              onClick: (_, rowData) => {
                this.acceptProposedTag(rowData);
              }
            },
            {
              icon: "clear",
              tooltip: "Decline",
              onClick: (_, rowData) => this.declineProposedTag(rowData)
            }
          ]}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProposedTags: params => dispatch(getProposedTags(params)),
      acceptTag: id => dispatch(acceptProposedTag(id)),
      declineTag: id => dispatch(declineProposedTag(id))
    }
  };
}

export default connect(null, mapDispatchToProps)(ProposedTags);
