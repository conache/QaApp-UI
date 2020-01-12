import React from 'react';
import {getReports} from '../../../api/reports';

class ReportsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {title: "Content", filed: "text"},
        {title: "Type", field: "type"},
        {title: "Author", field: "author"},
       ],
      data: (query) => this.fetchReports(query)
    }
  }

  fetchReports(query) {
    return new Promise((resolve, reject) => {
      const {page, pageSize} = query;
      getReports(page + 1, pageSize)
        .then(response => {
          const results = response.data;
          resolve({
            data: results.data,
            page: results.page - 1,
            totalCount: results.total
          });
        })
    });
  }

  render() {
    return <h3>Reports</h3>
  }
}

export default ReportsSection;