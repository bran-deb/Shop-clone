import type { NextPage, GetServerSideProps } from 'next'

import { Typography } from '@mui/material'

// import { initialData } from '../database/products'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'
// import { useRouter } from 'next/router';


interface Props {
    products: IProduct[]
}

const SearchPage: NextPage<Props> = ({ products }) => {
    // const { asPath } = useRouter()
    // console.log(asPath);

    /* A custom hook that is fetching the data from the API. */
    // const { products, isLoading } = useProducts(`/search/kid`)

    return (
        <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Encuentra los mejores productos'}>
            <Typography variant="h1" component='h1'>Resultados de Busqueda:</Typography>
            <Typography variant="h2" component='h2' sx={{ mb: 1 }}>Productos disponibles</Typography>

            {/* {
                isLoading
                    ? <FullScreenLoading /> : */}
            <ProductList products={products} />
            {/* } */}

            {/* <ProductList products={initialData.products as any} /> */}
        </ShopLayout>
    )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = '' } = params as { query: string }

    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }
    //si no hay productos en la query
    let products = await dbProducts.getPropductsByTerm(query)
    //TODO: retornar otros products
    return {
        props: {
            products
        }
    }
}

export default SearchPage
