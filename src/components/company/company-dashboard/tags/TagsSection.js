import React from "react";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { NotificationManager } from "react-notifications";
import { getTags, addTag, editTag, deleteTag } from "../../../../ducks/tags";
import { pathOr } from "ramda";

class TagsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: 10,
      columns: [{ title: "Name", field: "name" }]
    };
  }

  componentDidMount() {
    this.fetchTableData();
  }

  onPageChange(page) {
    this.setState({ page }, () => this.fetchTableData());
  }

  fetchTableData() {
    const {
      actions: { getTags }
    } = this.props;
    const { page, pageSize } = this.state;

    getTags(page, pageSize);
  }

  onRowDelete = entry => {
    const {
      actions: { deleteTag }
    } = this.props;

    return deleteTag(entry.id).then(() => this.fetchTableData());
  };

  onRowAdd(entry) {
    const {
      actions: { createTag }
    } = this.props;
    const { name } = entry;

    return createTag({ name }).then(() => this.fetchTableData());
  }

  onRowUpdate(newEntry, oldEntry) {
    const {
      actions: { editTag }
    } = this.props;

    return editTag(newEntry);
  }

  render() {
    const { page, pageSize } = this.state;
    const { loadingData, totalCount, data } = this.props;

    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          onChangePage={page => this.onPageChange(page)}
          isLoading={loadingData}
          page={page}
          totalCount={totalCount}
          options={{
            exportButton: false,
            search: false,
            addRowPosition: "first",
            pageSize: pageSize,
            pageSizeOptions: [],
            sorting: true
          }}
          title="All Tags"
          columns={this.state.columns}
          data={[...data]}
          editable={{
            onRowAdd: newData => this.onRowAdd(newData),
            onRowUpdate: (newData, oldData) =>
              this.onRowUpdate(newData, oldData),
            onRowDelete: rowData => this.onRowDelete(rowData)
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalCount: pathOr(0, ["tags", "tags", "totalCount"], state),
    loadingData: pathOr(false, ["tags", "tags", "loading"], state),
    data: (() => {
      const entries = pathOr([], ["tags", "tags", "data"], state);
      const rows = [];

      for (let tag of entries) {
        rows.push({ ...tag });
      }

      return rows;
    })()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getTags: (page, pageSize) => dispatch(getTags(page, pageSize)),
      editTag: params => dispatch(editTag(params)),
      createTag: params => dispatch(addTag(params)),
      deleteTag: id => dispatch(deleteTag(id))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagsSection);
