import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Button

} from '@mui/material'

const ProductDialog = ({open, onClose, onSubmit}) => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: 'General',
        sku: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev)=> ({
            ...prev,
            [name] : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        //Reset Form
        setFormData({
            name: '',
            description: '',
            price: '',
            quantity: '',
            category: 'General',
            sku: ''
        });
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Product</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                label="Product Name"
                                name="name"
                                value={formData.name}
                                variant="outlined"
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
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
                                label="Price"
                                name="price"
                                value={formData.price}
                                variant="outlined"
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label="Quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{p: 2}}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">Create</Button>
                </DialogActions>
            </form>
        </Dialog>
        
    );
}

export default ProductDialog;