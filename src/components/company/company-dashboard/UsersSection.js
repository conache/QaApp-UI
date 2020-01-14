import React from 'react';
import MaterialTable from "material-table";
import {getUserAccounts, removeUserAccount, createUserAccount, updateUserAccount} from '../../../api/users';
import { NotificationManager } from 'react-notifications';

class UsersSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: "First Name", field: "firstName"},
        {title: "Last Name", field: "lastName"},
        {title: "Email", field: "email", editable: 'onAdd'},
        {title: "User", field: "username", editable: 'onAdd'},
        {title: "Job", field: "job"},
        {
          title: "Role",
          field: "role",
          lookup: {
            "ROLE_USER": "Normal user",
            "ROLE_COMPANY_ADMINISTRATOR": "Company admin"
          }
        },
      ],
      data: (query) => this.fetchUsers(query)
    }
  }

  // REFACTOR THIS, IT'S 2 AM, WILL DO TOMOROW
  formatUserJSON(userJSON) {
    const {attributes} = userJSON;
    if (!attributes) {
      return userJSON;
    }
  
    const additional = {};
    ['job', 'role'].forEach(key => {
      const fieldValue = attributes[key];
      if (!fieldValue) {
        additional[key] = null;
        return;
      }
      additional[key] = fieldValue[0] || '';
    });

    return {
      ...userJSON,
      ...additional
    }
  }

  fetchUsers(query) {
    return new Promise((resolve, reject) => {
      const {page, pageSize} = query;
      getUserAccounts(page, pageSize)
        .then(response => {
          const result = response.data;
          resolve({
            data: result.users.map(representation => this.formatUserJSON(representation)),
            page: page,
            totalCount: result.totalCount
          });
        })
        .catch(error => {
          NotificationManager.error(`Could not fetch users. Error: ${error.message}`)
          reject();
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
    const {firstName, lastName, email, username, job, role} = entry;

    return createUserAccount({
      userRepresentation: {
        firstName,
        lastName,
        email,
        username  
      },
      roleName: role,
      jobName: job
    }).then(() => {
        NotificationManager.success("User successfully added to company");
      })
      .catch((error) => {
        NotificationManager.error(`Could not add user to company. Error: ${error.message}`);
      });
  }

  onRowUpdate(newEntry) {
    let attributes = newEntry.attributes || {};
    newEntry.attributes = {
      ...attributes,
      job: [newEntry.job],
      role: [newEntry.role]
    }
    return updateUserAccount(newEntry)
            .catch(error => {
              NotificationManager.error(`Could not finish editing user. Error: ${error.message}`);
            });
  }

  render() {
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