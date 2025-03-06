import React from 'react';
import { TablePagination } from '@mui/material';

const PaginationComponent = ({ count, page, setPage, rowsPerPage, setRowsPerPage }) => (
  <TablePagination rowsPerPageOptions={[5, 10, 25, 50]} component="div" count={count} rowsPerPage={rowsPerPage} page={page} onPageChange={(e, newPage) => setPage(newPage)} onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))} />
);

export default PaginationComponent;
