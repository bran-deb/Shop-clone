import type { NextPage } from 'next'

import { Typography } from '@mui/material'

// import { initialData } from '../database/products'
import { useProducts } from '@/hooks'
import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui'


const Home: NextPage = () => {
  /* A custom hook that is fetching the data from the API. */
  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos'}>
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" component='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={products} />
      }

      {/* <ProductList products={initialData.products as any} /> */}
    </ShopLayout>
  )
}


export default Home
