import type { NextPage } from 'next'

import { Typography } from '@mui/material'

// import { initialData } from '../database/products'
import { ShopLayout } from '../components/layouts'
import { ProductList } from '../components/products'
import { useProducts } from '../hooks'


const Home: NextPage = () => {

  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos'}>
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" component='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

      {
        isLoading
          ? <h1>Cargando...</h1>
          : <ProductList products={products} />
      }

      {/* <ProductList products={initialData.products as any} /> */}
    </ShopLayout>
  )
}


export default Home
