import React from 'react';
import MaterialTable from "material-table";

class UsersSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: "Name", field: "name"},
        {title: "Email", field: "email", editable: 'never'},
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
      data: [
        {name: "Gigi Tifon", email: "gtifon@gmail.com", job: "Engineer", role: 1},
        {name: "Andrei Mircea", email: "mandrei@gmail.com", job: "HR", role: 2}
      ]
    }
  }

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        options={{
          exportButton: true
        }}
        title="Company users"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            resolve();
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            resolve();
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            resolve();
          })
        }}/>
      </div>
    );
  }
}

export default UsersSection