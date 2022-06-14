import NextLink from 'next/link'

import { Card, Grid, CardContent, Typography, Divider, Box, Button, Link } from '@mui/material';

import { CartList, OrderSumary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';



const Sumary = () => {
    return (
        <ShopLayout title='Resumen de la orden' pageDescription='Resumen de la orden'>
            <Typography variant="h1" component='h1'>Resumen de la orden</Typography>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>

                <Grid item xs={12} sm={5} >
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen (3 productos)</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between' >
                                <Typography variant='subtitle1'>Direccion de entrega</Typography>
                                <NextLink href='/checkout/address' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography>Brandon Jairo</Typography>
                            <Typography>323 Algun lugar</Typography>
                            <Typography>Cbba,DKS 235</Typography>
                            <Typography>Bolivia</Typography>
                            <Typography>+591 7655432</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link underline='always'>
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSumary />

                            <Box sx={{ mt: 3 }}>
                                <NextLink href='/#' passHref>
                                    <Link>
                                        <Button color='secondary' className='circular-btn' fullWidth>
                                            Confirmar Orden
                                        </Button>
                                    </Link>
                                </NextLink>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

export default Sumary
