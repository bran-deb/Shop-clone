import { FC, useContext } from 'react';

import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { ItemCounter } from "../ui"
import { CartContext } from '../../context';
import { ICartProduct } from '../../interfaces';

// const productsInCart = [
//     initialData.products[0],
//     initialData.products[1],
//     initialData.products[2],
// ]

interface Props {
    editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue
        updateCartQuantity(product)
    }

    const deleteButton = (product: ICartProduct) => {
        if (editable) {
            return <Button
                onClick={() => removeCartProduct(product)}
                variant='text'
                color='warning'
            >
                Remover
            </Button>
        } else {
            return null
        }
    }

    return (
        <>
            {//(spacing) para separar los child
                cart.map(product => (
                    <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>

                        <Grid item xs={3}>
                            {/* TODO: llevar a la pagina del producto */}
                            <NextLink href={`/product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia image={`/products/${product.images}`}
                                            component='img'
                                            sx={{ borderRadius: 0.5 }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={6}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant="body1">{product.title}</Typography>
                                <Typography variant="body1">Talla: <strong>{product.size}</strong></Typography>

                                {
                                    // mostrar productos en carrito
                                    (editable)
                                        ? (<ItemCounter
                                            maxValue={10}
                                            currentValue={product.quantity}
                                            updateQuantity={(newValue) => onNewCartQuantityValue(product, newValue)} />)
                                        : (<Typography variant="h5">{product.quantity} {product.quantity < 1 ? "products" : product}</Typography>)
                                }

                            </Box>
                        </Grid>

                        <Grid item xs={3} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>

                            {/* {deleteButton(product)} */}

                            {editable && <Button
                                onClick={() => removeCartProduct(product)}
                                variant='text'
                                color='warning'
                            >
                                Remover
                            </Button>
                            }

                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
