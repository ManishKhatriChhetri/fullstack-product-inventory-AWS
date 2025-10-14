import React, { useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import ProductCard from './components/ProductCard.jsx'

function App () {

const [products, setProducts] = useState(
  [
    {
      id: 1,
      name: 'Laptop',
      description: 'HP Laptop',
      price: 1099.99,
      quantity: 2,
      category: 'Electronics',
      sku: 'LAP01'
    },
    {
      id: 2,
      name: 'Mobile',
      description: 'Iphone 16 pro max',
      price: 1199.99,
      quantity: 3,
      category: 'Electronics',
      sku: 'MOB01'
    }
  ]);

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
        <Grid container spacing={4}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product}/>
            </Grid> 
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default App;