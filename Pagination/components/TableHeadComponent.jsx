import React from 'react';
import { Checkbox, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

const TableHeadComponent = ({ rows, selected, setSelected, order, orderBy, setOrder, setOrderBy }) => {
  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? rows.map((n) => n.id) : []);
  };
//sorting
  const handleRequestSort = (property) => {
    setOrder(orderBy === property && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const headCells = rows.length ? Object.keys(rows[0]).filter(key => key !== 'id').map(key => ({
    id: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()
  })) : [];

  return (
    <TableHead sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>

      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox indeterminate={selected.length > 0 && selected.length < rows.length} checked={selected.length === rows.length} onChange={handleSelectAllClick} />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => handleRequestSort(headCell.id)}>
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
