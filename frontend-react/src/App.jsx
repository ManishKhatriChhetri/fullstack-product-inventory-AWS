import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function App () {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" fontWeight="bold">
            Product Inventory Manager
          </Typography>
          <Typography variant="body1">
            Manage your products here
          </Typography>
        </Container>
        
      </Box>
      
      <Container sx={{mt: 4}} maxWidth="lg">
        <Typography>Products will appear here</Typography>
      </Container>
    </Box>
  )
}

export default App;