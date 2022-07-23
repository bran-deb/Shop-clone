import { useState, useContext } from 'react';

import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Box, Grid, Typography, Button, Chip } from '@mui/material';

import { ProducSlideshow } from '../../components/products';
import { SizeSelector } from '../../components/products';
import { ShopLayout } from '../../components/layouts';
import { ItemCounter } from '../../components/ui';
import { dbProducts } from '../../database';
import { ICartProduct, IProduct, ISize } from '../../interfaces';
import { CartContext } from '../../context';

interface Props {
    product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
    // const { products: product, isLoading } = useProducts<IProduct>(`/products/${query.slug}`)
    const router = useRouter()
    const { addProductToCart } = useContext(CartContext);


    const INITIAL_TEMPCART_STATE: ICartProduct = {
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    }

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>(INITIAL_TEMPCART_STATE)

    const selectedSize = (size: ISize) => {
        setTempCartProduct(tempCartProduct => ({
            ...tempCartProduct,
            size,
        }))
    }

    const handleUpdatedQuantity = (quantity: number) => {
        setTempCartProduct(tempCartProduct => ({
            ...tempCartProduct,
            quantity,
        }))
    }

    const onAddProduct = () => {
        if (tempCartProduct.size === undefined) return
        //agrega los productos al carrito
        addProductToCart(tempCartProduct)
        router.push('/cart')
    }


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
                            {/* contador de productos*/}
                            <ItemCounter
                                currentValue={tempCartProduct.quantity}
                                maxValue={product.inStock}
                                updateQuantity={handleUpdatedQuantity}
                            />
                            {/* selector de tallas*/}
                            <SizeSelector
                                sizes={product.sizes}
                                selectedSize={tempCartProduct.size}
                                onSelectedSize={selectedSize}
                            />
                        </Box>

                        {/* agregar al carrito */}
                        {
                            (product.inStock > 0)
                                ? <Button onClick={onAddProduct} variant="contained" color="secondary" className='circular-btn'>
                                    {
                                        tempCartProduct.size ? 'Agregar al carrito' : 'Seleccione una talla'
                                    }
                                </Button>
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