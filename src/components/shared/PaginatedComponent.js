import React from 'react';
import { TablePagination, Grid } from "@material-ui/core";
import LoadingSpinner from './LoadingSpinner';

class PaginatedComponent extends React.Component {
  render() {
    const { children, label, count, page, pageSize, onPageChange, loading, noDataMessage } = this.props;
    
    if(loading) {
      return <LoadingSpinner />
    }

    return <div>
      {children}
      {!loading && count === 0 && <div className="no-data-message">{noDataMessage || "No data"}</div>}
      {count > 0 && (
        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
          <TablePagination
            count={count}
            page={page}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[]}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} ${label}`}
            onChangePage={(event, page) => onPageChange(page)}
          />
        </Grid>
      )}
    </div>
  }
}

export default PaginatedComponent;