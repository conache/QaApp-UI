import React from "react";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import {
  getAllAccounts,
  editAccount,
  createAccount,
  deleteAccount
} from "../../../ducks/accounts";
import { pathOr } from "ramda";

class UsersSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageSize: 10,
      columns: [
        { title: "First Name", field: "firstName" },
        { title: "Last Name", field: "lastName" },
        { title: "Email", field: "email", editable: "onAdd" },
        { title: "User", field: "username", editable: "onAdd" },
        { title: "Job", field: "job" },
        {
          title: "Role",
          field: "role",
          lookup: {
            ROLE_USER: "Normal user",
            ROLE_COMPANY_ADMINISTRATOR: "Company admin"
          }
        }
      ]
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
      actions: { getAllAccounts }
    } = this.props;
    const { page, pageSize } = this.state;

    getAllAccounts(page, pageSize);
  }

  onRowDelete(entry) {
    const {
      actions: { deleteUserAccount }
    } = this.props;

    return deleteUserAccount(entry.id).then(() => this.fetchTableData());
  }

  onRowAdd(entry) {
    const {
      actions: { createAccount }
    } = this.props;
    const { firstName, lastName, email, username, job, role } = entry;

    return createAccount({
      userRepresentation: {
        firstName,
        lastName,
        email,
        username
      },
      roleName: role,
      jobName: job
    }).then(() => this.fetchTableData());
  }

  onRowUpdate(newEntry) {
    const {
      actions: { editAccount }
    } = this.props;
    let attributes = newEntry.attributes || {};
    newEntry.attributes = {
      ...attributes,
      job: [newEntry.job || "Not specified"],
      role: [newEntry.role || "ROLE_USER"]
    };

    return editAccount(newEntry);
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
            exportButton: true,
            search: false,
            pageSize: pageSize,
            pageSizeOptions: [],
            addRowPosition: "first"
          }}
          title="Company users"
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
    totalCount: pathOr(0, ["accounts", "totalCount"], state),
    loadingData: pathOr(false, ["accounts", "loading"], state),
    data: (() => {
      const tableEntries = pathOr([], ["accounts", "data"], state);
      const rows = [];

      for (let user of tableEntries) {
        rows.push({ ...user });
      }

      return rows;
    })()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getAllAccounts: (page, pageSize) =>
        dispatch(getAllAccounts(page, pageSize)),
      editAccount: params => dispatch(editAccount(params)),
      createAccount: params => dispatch(createAccount(params)),
      deleteUserAccount: id => dispatch(deleteAccount(id))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersSection);
