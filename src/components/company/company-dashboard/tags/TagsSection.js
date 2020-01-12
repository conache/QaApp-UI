import React from 'react';
import MaterialTable from "material-table";
// import { getUserAccounts } from '../../../api/users';

class TagsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const { actions: { getAllTags } } = this.props;
    getAllTags();
  }

  onRowDelete = (entry) => {
    const { deleteTag } = this.props;
    deleteTag(1)
  }

  onRowAdd(entry) {
    const { addTag } = this.props;
    addTag(entry);
  }

  onRowUpdate(newEntry, oldEntry) {
    const { editTag } = this.props;
    editTag(newEntry);
  }

  render() {
    console.log(tableData.columns)
    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          options={{
            exportButton: true,
            search: false,
            // pageSize: 10,
            // pageSizeOptions: [],
            sorting: true
          }}
          title="All Tags"
          columns={tableData.columns}
          data={tableData.data}
          editable={{
            onRowAdd: (newData) => this.onRowAdd(newData),
            onRowUpdate: (newData, oldData) => this.onRowUpdate(newData, oldData),
            onRowDelete: (rowData) => this.onRowDelete(rowData)
          }} />
      </div>
    );
  }
}

export default TagsSection

const tableData = {
  columns: [
    { title: "Tag name", field: "name" }
  ],
  data: [
    { name: "tag 1" },
    { name: "tag 2" },
    { name: "tag 3" },
  ],
};