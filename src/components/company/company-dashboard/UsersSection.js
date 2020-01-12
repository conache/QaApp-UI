import React from 'react';
import MaterialTable from "material-table";
import {getUserAccounts, removeUserAccount, createUserAccount, updateUserAccount} from '../../../api/users';
import { NotificationManager } from 'react-notifications';

class UsersSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: "First Name", filed: "firstName"},
        {title: "Last Name", field: "lastName"},
        {title: "Email", field: "email", editable: 'onAdd'},
        {title: "Job", field: "job", default: 1},
        {
          title: "Role",
          field: "role",
          lookup: {
            1: "Admin",
            2: "Normal user"
          }
        },
      ],
      data: (query) => this.fetchUsers(query)
    }
  }

  fetchUsers(query) {
    return new Promise((resolve, reject) => {
      const {page, pageSize} = query;
      getUserAccounts(page + 1, pageSize)
        .then(response => {
          const results = response.data;
          resolve({
            data: results.data,
            page: results.page - 1,
            totalCount: results.total
          })
        })
        .catch(error => {
          NotificationManager.error(`Could not fetch users. Error: ${error.message}`)
        })
    });
  }
  
  onRowDelete(entry) {
    return removeUserAccount(entry.id)
          .then(() => {
            NotificationManager.success("User removed successfully");
          })
          .catch((error) => {
            NotificationManager.error(`Could not remove user. Error: ${error.message}`);
          });
  }

  onRowAdd(entry) {
    return createUserAccount(entry)
            .then(() => {
              NotificationManager.success("User successfully added to company");
            })
            .catch((error) => {
              NotificationManager.error(`Could not add user to company. Error: ${error.message}`);
            });
  }

  onRowUpdate(newEntry, oldEntry) {
    return updateUserAccount(oldEntry.id, newEntry)
            .catch(error => {
              NotificationManager.error(`Could not finish editing user. Error: ${error.message}`);
            });
  }

  render() {
    console.log(this.state.data)
    return (
      <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        options={{
          exportButton: true,
          search: false,
          pageSize: 10,
          pageSizeOptions: []
        }}
        title="Company users"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: (newData) =>this.onRowAdd(newData),
          onRowUpdate: (newData, oldData) => this.onRowUpdate(newData, oldData),
          onRowDelete: (rowData) => this.onRowDelete(rowData)
        }}/>
      </div>
    );
  }
}

export default UsersSection