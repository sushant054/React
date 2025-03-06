import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingComponent = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
    <CircularProgress />
  </Box>
);

export default LoadingComponent;
