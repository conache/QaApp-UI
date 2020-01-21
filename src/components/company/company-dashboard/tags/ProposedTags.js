import React from 'react';
import MaterialTable from "material-table";
import { NotificationManager } from 'react-notifications';
import { getProposedTags, acceptProposedTag, declineProposedTag } from '../../../../api/tags';

class ProposedTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  getProposedTags = () => {
    getProposedTags();
  }

  componentDidMount() {
    this.getProposedTags();
  }

  acceptProposedTag = (rowData) => {
    acceptProposedTag(rowData.id)
      .then(() => {
        NotificationManager.success("User removed successfully");
        this.getProposedTags();
      })
      .catch((error) => {
        NotificationManager.error(`Could not remove user. Error: ${error.message}`);
      });
  }

  declineProposedTag = (rowData) => {
    declineProposedTag(rowData.id)
    .then(() => {
      NotificationManager.success("User removed successfully");
      this.getProposedTags();
    })
    .catch((error) => {
      NotificationManager.error(`Could not remove user. Error: ${error.message}`);
    });
  }

  render() {
    console.log(tableData.columns)
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          options={{
            exportButton: false,
            search: false,
            pageSize: 10,
            pageSizeOptions: [],
            sorting: true,
          }}
          title="Proposed Tags"
          columns={tableData.columns}
          data={tableData.data}
          actions={[
            {
              icon: 'check',
              tooltip: 'Accept',
              onClick: (_, rowData) => this.acceptProposedTag(rowData),
            },
            {
              icon: 'clear',
              tooltip: 'Decline',
              onClick: (_, rowData) => this.declineProposedTag(rowData),
            }
          ]}
          detailPanel={[
            {
              tooltip: 'Show more details',
              render: rowData => {
                return (
                  <div
                    style={{
                      padding: '1rem',
                    }}
                  >
                    {"Resembling existing tags: tag1, tag 2, tag 3"}
                  </div>
                )
              },
            },]}
        />

      </div>
    );
  }
}

export default ProposedTags;

const tableData = {
  columns: [
    { title: "Proposed tag", field: "name" },
    { title: "Resembling existing tags", field: "existingTags", sorting: false }
  ],
  data: [
    { name: "tag 1", existingTags: 'sssssssssssssssssssss sdjhf skjdsd lak jsdlakhsd jkas djhasd jha ' },
    { name: "tag 2" },
    { name: "tag 3" },
    { name: "tag 4" },
    { name: "tag 5" },
  ],
};