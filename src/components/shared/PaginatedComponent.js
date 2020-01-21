import React from 'react';
import { TablePagination, Grid } from "@material-ui/core";

class PaginatedComponent extends React.Component {
  render() {
    const { children, label, count, page, pageSize, onPageChange } = this.props;
    return <div>
      {children}
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