import NextLink from 'next/link'

import { Card, Grid, CardContent, Typography, Divider, Box, Button, Link } from '@mui/material';

import { CartList, OrderSumary } from '../../components/cart';
import { ShopLayout } from '../../components/layouts';



const CartPage = () => {
  return (
    <ShopLayout title='Carrito - 3' pageDescription='Carrito de compras de la tienda'>
      <Typography variant="h1" component='h1'>Carrito</Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={true} />
        </Grid>

        <Grid item xs={12} sm={5} >
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Orden</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSumary />

              <Box sx={{ mt: 3 }}>
                <NextLink href='/checkout/addres' passHref>
                  <Link>
                    <Button color='secondary' className='circular-btn' fullWidth>
                      Checkout
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

export default CartPage
