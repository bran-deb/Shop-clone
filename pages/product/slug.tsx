import { Box, Grid, Typography, Button, Chip } from '@mui/material';
import { ProducSlideshow } from '../../components/products';
import { ShopLayout } from '../../components/layouts';
import { initialData } from '../../database/products';



const product = initialData.products[0]


const ProductPage = () => {
    return (
        <ShopLayout title={product.title} pageDescription={product.description} >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    {/* Slideshow */}
                    <ProducSlideshow images={product.images} />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        {/* titulos */}
                        <Typography variant="h1" component="h1">{product.title}</Typography>
                        <Typography variant="subtitle1" component="h2">${product.price}</Typography>
                        {/* Cantidad */}
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle2" component="h2">Cantidad</Typography>
                            {/* TODO: Item counter */}
                        </Box>

                        {/* agregar al carrito */}
                        <Button variant="contained" color="secondary" className='circular-btn'>
                            Agregar al carrito
                        </Button>
                        {/* TODO: validar mensaje de no hay disponible */}
                        {/* <Chip label='No hay disponibles' color='error' variant='outlined' /> */}

                        {/* Descripcion */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant='subtitle2' component="h2">Descripcion</Typography>
                            <Typography variant="body2" >{product.description}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout >
    )
};

export default ProductPage;
