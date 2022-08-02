import { FC, useContext } from 'react';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import NextLink from 'next/link'

import { CartContext } from '@/context';
import { ICartProduct, IOrderItem } from '@/interfaces';
import { ItemCounter } from '../ui';

// const productsInCart = [
//     initialData.products[0],
//     initialData.products[1],
//     initialData.products[2],
// ]

interface Props {
    editable?: boolean
    products?: IOrderItem[]
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue
        updateCartQuantity(product)
    }

    const deleteButton = (product: ICartProduct) => {
        if (editable) return (
            <Button onClick={() => removeCartProduct(product)} variant='text' color='warning'>
                Remover
            </Button>
        )
    }

    const productsToShow = products ? products : cart

    return (
        <>
            {//(spacing) para separar los child
                productsToShow.map(product => (
                    <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            {/* TODO: llevar a la pagina del producto */}
                            <NextLink href={`/product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.image}`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={6}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant="body1">{product.title}</Typography>
                                <Typography variant="body1">Talla: <strong>{product.size}</strong></Typography>

                                {/* mostrar productos en carrito */}
                                {
                                    editable
                                        ? (
                                            <ItemCounter
                                                currentValue={product.quantity}
                                                maxValue={10}
                                                updateQuantity={(value) => onNewCartQuantityValue(product as ICartProduct, value)}
                                            />
                                        )
                                        : (
                                            <Typography variant='h5'>{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>
                                        )
                                }

                            </Box>
                        </Grid>

                        <Grid item xs={3} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>

                            {/* borrar producto del carrito */}
                            {deleteButton(product as ICartProduct)}
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
