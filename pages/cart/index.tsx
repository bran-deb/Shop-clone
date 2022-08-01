import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, Grid, CardContent, Typography, Divider, Box, Button, Link } from '@mui/material';

import { CartList, OrderSumary } from '@/components/cart';
import { ShopLayout } from '@/components/layouts';
import { CartContext } from '@/context';



const CartPage = () => {

  const router = useRouter()
  const { isLoaded, cart } = useContext(CartContext);

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace('/cart/empty')
    }
  }, [isLoaded, cart, router])
  //evita renderizar toda la pantalla de cart
  if (!isLoaded || cart.length === 0) return (<></>)

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
                <Button
                  color='secondary'
                  className='circular-btn'
                  fullWidth
                  href='/checkout/address'
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default CartPage
