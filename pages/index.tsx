import type { NextPage } from 'next'

import Typography from '@mui/material/Typography'
import { Card, CardActionArea, CardMedia, Grid } from '@mui/material'

import { initialData } from '../database/products'
import { ShopLayout } from '../components/layouts'




const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos'}>
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" component='h1' sx={{ mb: 1 }}>Todos los productos</Typography>

      <Grid container spacing={4}>
        {
          initialData.products.map(product => (
            <Grid item xs={6} sm={4} key={product.slug}>
              <Card>
                <CardActionArea>
                  <CardMedia          //carga bajo demanda
                    component={'img'}
                    image={`products/${product.images[0]}`}
                    alt={product.title}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </ShopLayout>
  )
}


export default Home
