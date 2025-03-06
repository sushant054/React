import React from 'react';
import { Checkbox, TableBody, TableRow, TableCell } from '@mui/material';

const TableBodyComponent = ({ rows, selected, setSelected, order, orderBy, page, rowsPerPage }) => {
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, id) => {
    setSelected(selected.includes(id) ? selected.filter(sel => sel !== id) : [...selected, id]);
  };

  const sortedRows = [...rows].sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableBody>
      {sortedRows.map((row) => (
        <TableRow key={row.id} hover onClick={(event) => handleClick(event, row.id)} selected={isSelected(row.id)}>
          <TableCell padding="checkbox">
            <Checkbox checked={isSelected(row.id)} />
          </TableCell>
          {Object.keys(row).filter(key => key !== 'id').map((key) => (
            <TableCell key={key}>{typeof row[key] === 'object' ? JSON.stringify(row[key]) : row[key]}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyComponent;
