import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Fab, CircularProgress, Paper, Button } from '@mui/material';
import ProductCard from './components/ProductCard.jsx'
import ProductDialog from './components/ProductDialog.jsx'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

function App () {

  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const API_URL = "https://5iuovjt7z2.execute-api.us-east-1.amazonaws.com";

  //Add useEffect to fetch products on load
  useEffect(()=> {
    getProducts();
  }, []);

  //Get all products function
  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/products`);
      console.log("Response data: ", response.data);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products");
    } finally {
        setLoading(false);
    }
  }

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
          onSubmit={handleCreateProduct}
        />
      }
      
    </Box>
  )
}

export default App;