import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Fab, CircularProgress, Paper, Button, Snackbar, Alert } from '@mui/material';
import ProductCard from './components/ProductCard.jsx'
import ProductDialog from './components/ProductDialog.jsx'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function App () {

  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [snackbar, setSnackbar] = useState(
    {
      open: false,
      message: '',
      severity: 'success',
    }
  );
  
  const API_URL = process.env.REACT_APP_API_URL;

  //Add useEffect to fetch products on load
  useEffect(()=> {
    getProducts();
  }, []);

  const showSnackBar = (message, severity='success') => {
    setSnackbar({open: true, message, severity});
  };

  //Get all products function
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products`);
      console.log("Response data: ", response.data);
      setProducts(response.data.products || []);
    } catch (error) {
        showSnackBar('Error fetching products', 'error');
    } finally {
        setLoading(false);
    }
  }

  //Create product function
  const handleCreateProduct = async (productData) => {
    try {
      const response = await axios.post(`${API_URL}/products`, productData);
      setProducts([response.data.product, ...products]);
      setProductDialog(false);
      showSnackBar('Product created successfully!');
    } catch (error) {
        showSnackBar('Error creating products', 'error');
    }
  }

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete the product?')) {
      try {
        await axios.delete(`${API_URL}/products/${id}`)
        setProducts(products.filter(p => p.id !== id));
        showSnackBar('Product deleted successfully!');
      } catch (error) {
          showSnackBar('Error deleting product', 'error');
      }
    }
  }

  const handleUpdateProduct = async (productData) => {
    try {
      const response = await axios.put(`${API_URL}/products/${editingProduct.id}`, productData);
      setProducts(products.map(p => p.id === editingProduct.id? response.data.product : p));
      setProductDialog(false);
      setEditingProduct(null);
      showSnackBar('Product edited successfully!');
    } catch (error) {
        showSnackBar('Error updating product', 'error');
    }
  }

  //Handler functions  
  const handleEdit = (product) => {
    setEditingProduct(product);
    setProductDialog(true);
  }

  const handleAdd = () => {
    setProductDialog(true);
    setEditingProduct(null);
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
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size={30}/>
          </Box>
        ): products.length === 0 ? (
          <Paper sx={{p: 8, textAlign: 'center'}}>
            <Typography variant='h5' gutterBottom color="text.secondary">
              No Products Yet
            </Typography>
            <Typography variant='body1' color="text.secondary" mb={3}>
              Please add your first product
            </Typography>
            <Button 
              variant='contained'
              size='large'
              startIcon={<AddIcon />}
              onClick={()=> setProductDialog(true)}>
              Add Product
            </Button>
          </Paper>
        ) : (
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
        )}

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
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          product={editingProduct}
        />
      }
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={()=> setSnackbar({...snackbar, open: false})}
      >
        <Alert
          severity={snackbar.severity} 
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default App;