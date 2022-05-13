import { NextPage } from 'next'
import NextLink from 'next/link'

import { Card, Grid, CardContent, Typography, Divider, Box, Link, Chip } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { CartList, OrderSumary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';


const OrderPage: NextPage = () => {

    const paid: boolean = true

    const payStatus = () => {
        if (paid) {
            return <Chip
                sx={{ my: 2 }}
                label='Orden ya fue pagada'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
            />
        }
        else {
            return <Chip
                sx={{ my: 2 }}
                label='Pendiente de pago'
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined />}
            />
        }
    }

    return (
        <ShopLayout title='Resumen de la orden 23145645' pageDescription='Resumen de la orden'>
            <Typography variant="h1" component='h1'>Orden DGHF231234</Typography>

            {payStatus()}

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
                                <NextLink href='/checkout/addres' passHref>
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
                                {/* TODO: pagar */}
                                <h1>Pagar</h1>
                            </Box>

                            {payStatus()}

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

export default OrderPage
