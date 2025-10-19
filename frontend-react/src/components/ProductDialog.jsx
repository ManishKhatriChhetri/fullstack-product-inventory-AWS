import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Button,
    MenuItem,

} from '@mui/material'

const ProductDialog = ({open, onClose, onSubmit, product}) => {

    //Add error state
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: 'General',
        sku: ''
    })

    const categories = [
        'Electronics',
        'Clothing',
        'Food & Beverage',
        'Home & Garden',
        'Sports & Outdoors',
        'Books',
        'Toys & Games',
        'Health & Beauty',
        'Automotive',
        'Office Supplies',
        'General',
    ]

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                price: product.price || '',
                quantity: product.quantity || '',
                category: product.category || 'General',
                sku: product.sku || '',
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                quantity: '',
                category: 'General',
                sku: '',
            });
        }
        setErrors({});
    }, [product, open]);

    //Add validation function
    const validate = () => {
        const newErrors = {};
        if(!formData.name.trim()) {
            newErrors.name = "Product name is required";
        } else if (formData.name.length < 3) {
            newErrors.name = "Product name must be at least 3 characters";
        }

        if(!formData.price || parseFloat(formData.price) <=0) {
            newErrors.price = "Price must be greater than 0";
        } else if (isNaN(formData.price)) {
            newErrors.price = "Price must be a number";
        }

        if(!formData.quantity || parseInt(formData.quantity) < 0) {
            newErrors.quantity = "Quantity cannot be negative";
        } else if (isNaN(formData.quantity)) {
            newErrors.quantity = "Quantity must be a number";
        } else if (!Number.isInteger(parseFloat(formData.quantity))) {
            newErrors.quantity = "Quantity must be a whole number";
        }

        if(formData.sku && formData.sku.length < 3) {
            newErrors.sku = "SKU must be at least 3 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev)=> ({
            ...prev,
            [name] : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()) {
            onSubmit(formData);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{product? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                label="Product Name"
                                name="name"
                                value={formData.name}
                                variant="outlined"
                                onChange={handleChange}
                                required
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                variant="outlined"
                                multiline
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                label="Price"
                                name="price"
                                value={formData.price}
                                variant="outlined"
                                onChange={handleChange}
                                required
                                error={!!errors.price}
                                helperText={errors.price}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                label="Quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                error={!!errors.quantity}
                                helperText={errors.quantity}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                fullWidth
                                select
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                {categories.map(
                                    (category) => (
                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                    )
                                )}
                            </TextField>    
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="SKU (Stock Keeping Unit)"
                                name="sku"
                                value={formData.sku}
                                onChange={handleChange}
                                error={!!errors.sku}
                                helperText={errors.sku}
                            />
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions sx={{p: 2}}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">{product? 'Update' : 'Create'}</Button>
                </DialogActions>
            </form>
        </Dialog>
        
    );
}

export default ProductDialog;