import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Fab } from '@mui/material';
import ProductCard from './components/ProductCard.jsx'
import ProductDialog from './components/ProductDialog.jsx'
import AddIcon from '@mui/icons-material/Add';

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

  const [productDialog, setProductDialog] = useState(false);

  //Handler functions  
  const handleEdit = (product) => {
    alert(`Editing: ${product.name} `);
  }

  const handleDelete = (product, id) => {
    if(window.confirm('Are you sure you want to delete?')) {
       alert(`Deleting: ${product.name} `);
       setProducts(products.filter(p => p.id !== id));
    }
  }

  const handleAdd = () => {
    setProductDialog(true);
  }

  const handleCreateProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now(),
      price: parseFloat(productData.price),
      quantity: parseInt(productData.quantity)
    }
    setProducts([newProduct, ...products]);
  }

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
        <Grid container spacing={4}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard 
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </Grid> 
          ))}
        </Grid>
      </Container>

      <Fab 
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 50,
          right: 50
        }}
        onClick={handleAdd}
      >
          <AddIcon />
      </Fab>
      
      {productDialog && 
        <ProductDialog 
          open={productDialog}
          onClose={() => setProductDialog(false)}
          onSubmit={handleCreateProduct}
        />
      }
      
    </Box>
  )
}

export default App;