import type { NextPage } from 'next'

import Typography from '@mui/material/Typography'

import { initialData } from '../database/products'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'




const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos'}>
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" component='h1' sx={{ mb: 1 }}>Todos los productos</Typography>

      <ProductList products={initialData.products as any}
      />

    </ShopLayout>
  )
}


export default Home
