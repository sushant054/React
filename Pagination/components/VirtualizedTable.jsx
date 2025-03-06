import React from 'react';
import { FixedSizeList } from 'react-window';
import { Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Paper, Box } from '@mui/material';

const VirtualizedTable = ({ rows, selected, setSelected }) => {
  const isSelected = (id) => selected.includes(id);

  const handleClick = (id) => {
    setSelected(isSelected(id) ? selected.filter(sel => sel !== id) : [...selected, id]);
  };

  const Row = ({ index, style }) => {
    const row = rows[index];

    return (
      <TableRow
        key={row.id}
        hover
        style={{ ...style, display: 'flex', width: '100%' }}
        onClick={() => handleClick(row.id)}
        selected={isSelected(row.id)}
      >
        <TableCell padding="checkbox" sx={{ flex: '0 0 50px' }}>
          <Checkbox checked={isSelected(row.id)} />
        </TableCell>
        {Object.keys(row).filter(key => key !== 'id').map((key) => (
          <TableCell
            key={key}
            sx={{
              flex: '1 0 150px',  
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {typeof row[key] === 'object' ? JSON.stringify(row[key]) : row[key]}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  return (
    <Paper sx={{ width: '100%', height: '500px', overflow: 'hidden' }}>
      {/* Wrap Table in a Scrollable Container */}
      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        <Table stickyHeader sx={{ display: 'flex', flexDirection: 'column', minWidth: '1000px' }}>
          <TableHead sx={{ flex: '0 0 auto' }}>
            <TableRow sx={{ display: 'flex', width: '100%' }}>
              <TableCell padding="checkbox" sx={{ flex: '0 0 50px' }}>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < rows.length}
                  checked={selected.length === rows.length}
                  onChange={(event) => setSelected(event.target.checked ? rows.map((n) => n.id) : [])}
                />
              </TableCell>
              {Object.keys(rows[0]).filter(key => key !== 'id').map((key) => (
                <TableCell
                  key={key}
                  sx={{
                    flex: '1 0 150px',  
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>

        {/* Virtualized List Inside Scrollable Box */}
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <FixedSizeList height={450} itemSize={50} itemCount={rows.length} width="100%">
            {Row}
          </FixedSizeList>
        </Box>
      </Box>
    </Paper>
  );
};

export default VirtualizedTable;
