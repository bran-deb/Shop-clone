import { FC } from "react"

import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { initialData } from "../../database/products"
import { ItemCounter } from "../ui"


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export const CartList: FC = () => {
    return (
        <>
            {//(spacing) para separar los child
                productsInCart.map(product => (
                    <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>

                        <Grid item xs={3}>
                            {/* TODO: llevar a la pagina del producto */}
                            <NextLink href={'/product/slug'} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia image={`products/${product.images[0]}`}
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
                                <Typography variant="body1">Talla: <strong>M</strong></Typography>

                                {/* Conditional */}
                                <ItemCounter />
                            </Box>
                        </Grid>

                        <Grid item xs={3} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
                            {/* Editable */}
                            <Button variant='text' color='warning'>
                                Remover
                            </Button>
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
