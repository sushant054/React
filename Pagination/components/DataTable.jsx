import React, { useState, useEffect } from 'react';
import { Paper, Button, Box } from '@mui/material';
import LoadingComponent from './LoadingComponent';
import EmptyStateComponent from './EmptyStateComponent';
import TableHeadComponent from './TableHeadComponent';
import TableBodyComponent from './TableBodyComponent';
import PaginationComponent from './PaginationComponent';
import VirtualizedTable from './VirtualizedTable';

const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('orderId');
  const [useVirtualization, setUseVirtualization] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/orders.json');//reading json file....
        if (!response.ok) throw new Error('Failed to fetch orders data');
        const data = await response.json();
        setRows(
          data.map((order, index) => ({ ...order, id: order.id || order.orderId || index }))
        );
      } catch (error) {
        console.error('Error loading orders data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <LoadingComponent />;
  if (rows.length === 0) return <EmptyStateComponent />;

  return (
<Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
  <Box display="flex" justifyContent="flex-end" mb={2}>
    <Button variant="contained" onClick={() => setUseVirtualization(!useVirtualization)}>
      {useVirtualization ? 'Switch to Standard Table' : 'Load All (Virtualized)'}
    </Button>
  </Box>
  {useVirtualization ? (
    <VirtualizedTable rows={rows} selected={selected} setSelected={setSelected} />
  ) : (
    <Box sx={{ maxHeight: rows.length > 30 ? 500 : 'auto', overflowY: rows.length > 30 ? 'auto' : 'visible' }}>
      <TableHeadComponent
        rows={rows}
        selected={selected}
        setSelected={setSelected}
        order={order}
        orderBy={orderBy}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        stickyHeader={rows.length > 30}
      />
      <TableBodyComponent
        rows={rows}
        selected={selected}
        setSelected={setSelected}
        order={order}
        orderBy={orderBy}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </Box>
  )}
  <PaginationComponent
    count={rows.length}
    page={page}
    setPage={setPage}
    rowsPerPage={rowsPerPage}
    setRowsPerPage={setRowsPerPage}
  />
</Paper>

  );
};

export default DataTable;
