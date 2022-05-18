import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

import { Box, Grid, Typography, Button, Chip } from '@mui/material';

import { ProducSlideshow } from '../../components/products';
import { SizeSelector } from '../../components/products';
import { ShopLayout } from '../../components/layouts';
import { ItemCounter } from '../../components/ui';
import { initialData } from '../../database/products';
import { dbProducts } from '../../database';
import { IProduct } from '../../interfaces';

const product = initialData.products[0]


interface Props {
    product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
    // const { query } = useRouter()
    // const { products: product, isLoading } = useProducts<IProduct>(`/products/${query.slug}`)

    return (
        <ShopLayout title={product.title} pageDescription={product.description} >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    {/* Slideshow */}
                    <ProducSlideshow images={product.images} />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display='flex' flexDirection='column'>
                        {/* titulos */}
                        <Typography variant="h1" component="h1">{product.title}</Typography>
                        <Typography variant="subtitle1" component="h2">${product.price}</Typography>

                        {/* Cantidad */}
                        <Box sx={{ my: 2 }}>
                            <Typography variant="subtitle2" component="h2">Cantidad</Typography>
                            {/* TODO: Item counter funcion*/}
                            <ItemCounter />
                            <SizeSelector
                                // selectedSize={product.sizes[0]}
                                sizes={product.sizes}
                            />
                        </Box>

                        {/* agregar al carrito */}
                        {
                            (product.inStock > 0)
                                ? <Button variant="contained" color="secondary" className='circular-btn'>Agregar al carrito</Button>
                                : <Chip variant="outlined" color="error" label='Producto no disponible' />
                        }

                        {/* Descripcion */}
                        <Box sx={{ mt: 3 }}>
                            <Typography variant='subtitle2' component="h2">Descripcion</Typography>
                            <Typography variant="body2" >{product.description}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout >
    )
};


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const productSlugs = await dbProducts.getAllProductSlugs();


    return {
        paths: productSlugs.map(({ slug }) => ({
            params: {
                slug
            }
        })),
        fallback: 'blocking'
    }
}


/**
 * This function is called at build time and returns an object with the props that will be passed to
 * the page component.
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug = '' } = params as { slug: string };
    const product = await dbProducts.getProductBySlug(slug);

    if (!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24
    }
}




// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
//NOTE: SSR
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {

//     const { slug = '' } = params as { slug: string }
//     const product = await dbProducts.getProductBySlug(slug)

//     if (!product) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {
//             product
//         }
//     }
// }

export default ProductPage;