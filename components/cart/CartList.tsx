import { FC } from "react"
import NextLink from 'next/link'

import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { initialData } from "../../database/products"
import { ItemCounter } from "../ui"
import { Card } from "@mui/material"


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {

    const deleteButton = () => {
        if (editable)
            return <Button variant='text' color='warning'>Remover</Button>
    }
    const counterButton = () => {
        if (editable) return <ItemCounter />
        return <Typography variant="h5" >3</Typography>
    }

    return (
        <>
            {//(spacing) para separar los child
                productsInCart.map(product => (
                    <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>

                        <Grid item xs={3}>
                            <Card>
                                {/* TODO: llevar a la pagina del producto */}
                                <NextLink href={`/product/${product.slug}`} passHref prefetch={false}>
                                    <Link>
                                        <CardActionArea>
                                            <CardMedia image={`/products/${product.images[0]}`}
                                                component='img'
                                                alt={product.title}
                                                sx={{ borderRadius: 0.5 }}
                                            />
                                        </CardActionArea>
                                    </Link>
                                </NextLink>
                            </Card>
                        </Grid>

                        <Grid item xs={6}>
                            <Box display='flex' flexDirection='column'>
                                <Typography variant="body1">{product.title}</Typography>
                                <Typography variant="body1">Talla: <strong>M</strong></Typography>

                                {counterButton()}

                            </Box>
                        </Grid>

                        <Grid item xs={3} display='flex' alignItems='center' flexDirection='column'>
                            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>

                            {deleteButton()}

                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
