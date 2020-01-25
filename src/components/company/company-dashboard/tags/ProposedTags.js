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

  acceptProposedTag = rowData => {
    const {
      actions: { acceptTag }
    } = this.props;

    acceptTag(rowData.id);
  };

  declineProposedTag = rowData => {
    const {
      actions: { declineTag }
    } = this.props;

    declineTag(rowData.id);
  };

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          options={{
            exportButton: false,
            search: false,
            pageSize: 10,
            pageSizeOptions: [],
            sorting: true
          }}
          title="Proposed Tags"
          columns={this.state.columns}
          data={query => this.fetchProposedTags(query)}
          actions={[
            {
              icon: "check",
              tooltip: "Accept",
              onClick: (_, rowData) => this.acceptProposedTag(rowData)
            },
            {
              icon: "clear",
              tooltip: "Decline",
              onClick: (_, rowData) => this.declineProposedTag(rowData)
            }
          ]}
          detailPanel={[
            {
              tooltip: "Show similar existing tags",
              render: rowData => {
                return (
                  <div style={{ padding: "1rem" }}>
                    {rowData.similarTags && rowData.similarTags.length
                      ? `Similar tags with the proposed tag: ${rowData.similarTags.join(
                          ", "
                        )}`
                      : "No existing tag is similar with this tag"}
                  </div>
                );
              }
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
