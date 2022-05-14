import type { NextPage } from 'next'

import { Typography } from '@mui/material'

// import { initialData } from '../database/products'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'
import { useRouter } from 'next/router';


const SearchPage: NextPage = () => {

    const { asPath } = useRouter()
    console.log(asPath);

    /* A custom hook that is fetching the data from the API. */
    const { products, isLoading } = useProducts(`/${asPath}`)

    return (
        <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos'}>
            <Typography variant="h1" component='h1'>Resultados de Busqueda:</Typography>
            <Typography variant="h2" component='h2' sx={{ mb: 1 }}>Productos disponibles</Typography>

            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }

            {/* <ProductList products={initialData.products as any} /> */}
        </ShopLayout>
    )
}


export default SearchPage
