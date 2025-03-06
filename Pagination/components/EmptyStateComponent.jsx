import React from 'react';
import { Paper, Typography } from '@mui/material';

const EmptyStateComponent = () => (
  <Paper sx={{ width: '100%', p: 2, textAlign: 'center' }}>
    <Typography variant="body1">No order data available</Typography>
  </Paper>
);

export default EmptyStateComponent;
