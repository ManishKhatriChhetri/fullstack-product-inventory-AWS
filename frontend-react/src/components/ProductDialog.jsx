import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    Button

} from '@mui/material'

const ProductDialog = ({open}) => {
    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Product</DialogTitle>
            <form>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                
                                label="Product Name"
                                name="name"
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                label="Description"
                                name="description"
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label="Price"
                                name="price"
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label="Quantity"
                                name="quantity"
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{p: 2}}>
                    <Button>Cancel</Button>
                    <Button type="submit" variant="contained">Create</Button>
                </DialogActions>
            </form>
        </Dialog>
        
    );
}

export default ProductDialog;