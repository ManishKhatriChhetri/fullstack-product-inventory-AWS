import React from "react";
import {
    Typography,
    Box,
    Card,
    CardContent,
    Chip
} from '@mui/material'

function ProductCard ({product}) {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "USD"
        }).format(price);
    }
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>{product.name}</Typography>
                <Typography variant='body2' color="text.secondary" sx={{ mb: 2 }}>{product.description}</Typography>
                
                <Box sx={{mt: 2}}>
                    <Typography variant="h6" color="primary">Price: {formatPrice(product.price)}</Typography>
                    <Typography variant='body2'>Quantity: {product.quantity}</Typography>
                    <Typography variant='body2'>Category: {product.category}</Typography>
                </Box>
                
            </CardContent>
        </Card>
       
    );
}

export default ProductCard;
