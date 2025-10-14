import React from "react";
import {
    Typography,
    Box,
    Card,
    CardContent,
    Chip
} from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory';

function ProductCard ({product}) {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "USD"
        }).format(price);
    }

    const getStockStatus = (quantity) => {
        if(quantity===0){return {label: "Out of Stock", color: 'error'}};
        if(quantity<10){return {label: "Low Stock", color: 'warning'}};

        return {
            label: "In Stock",
            color: 'success'
        }
    }

    const stockStatus = getStockStatus(product.quantity);

    return (
        <Card sx={{ 
            height: '100%',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,}
            }}>
            <CardContent>
                {/* Add Inventory Icon and Status Chip */}
                <Box display='flex' justifyContent="space-between" mb={2}>
                    <InventoryIcon color="primary" sx={{fontSize: 40}}/>
                    <Chip>
                        label = {stockStatus.label}
                        color = {stockStatus.color}
                        size = "small"
                    </Chip>
                </Box>

                <Typography variant="h6" gutterBottom>{product.name}</Typography>
                <Typography variant='body2' color="text.secondary" sx={{ mb: 2 }}>{product.description}</Typography>
                
                <Box sx={{mt: 2}}>
                    <Typography variant="h6" color="primary">Price: {formatPrice(product.price)}</Typography>
                    <Typography variant='body2'>Quantity: {product.quantity}</Typography>
                    <Typography variant='body2'>Category: {product.category}</Typography>
                    <Typography variant='body2'>SKU: {product.sku}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

export default ProductCard;
