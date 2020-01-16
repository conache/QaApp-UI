import React from 'react';
import MaterialTable from "material-table";
import {NotificationManager} from 'react-notifications';
import {getAllTags, deleteTag, addTag, editTag} from '../../../../api/tags';

class TagsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "name" }
      ]
    }
  }

  fetchTags(query) {
    return new Promise((resolve, reject) => {
      const {page, pageSize} = query;
      getAllTags(page, pageSize)
      .then(response => {
        console.log(response);
        const result = response.data;
        console.log("Result:", result);
        resolve({
          data: result.content,
          page: page,
          totalCount: result.totalElements
        });
      })
      .catch(error => {
        NotificationManager.error(`Could not fetch tags. Error: ${error.message}`);
        reject();
      })
    });
  }

  onRowDelete = (entry) => {
    return deleteTag(entry.id)
          .then(() => {
            NotificationManager.success("Tag removed successfully");
          })
          .catch((error) => {
            NotificationManager.error(`Could not remove tag. Error: ${error.message}`);
          });
  }

  onRowAdd(entry) {
    const {name} = entry;
    return addTag({
      name
    }).then(() => {
      NotificationManager.success("Tag successfully created");
    }).catch((error) => {
      NotificationManager.error(`Could not add tag. Error: ${error.message}`);
    });
  }

  onRowUpdate(newEntry, oldEntry) {
    return editTag(newEntry)
            .catch(error => {
              NotificationManager.error(`Failed editing tag. Error: ${error.message}`);
            });
  }

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          options={{
            exportButton: false,
            search: false,
            addRowPosition: 'first',
            pageSize: 10,
            pageSizeOptions: [],
            sorting: true
          }}
          title="All Tags"
          columns={this.state.columns}
          data={(query => this.fetchTags(query))}
          editable={{
            onRowAdd: (newData) => this.onRowAdd(newData),
            onRowUpdate: (newData, oldData) => this.onRowUpdate(newData, oldData),
            onRowDelete: (rowData) => this.onRowDelete(rowData)
          }} />
      </div>
    );
  }
}

export default TagsSection;