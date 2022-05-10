import { FC, useMemo, useState } from "react";
import NextLink from 'next/link'

import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";

import { IProduct } from "../../interfaces";


interface Props {
    product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [isHovered, setIsHoverated] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);


    const productImage = useMemo(() => {
        return isHovered
            ? `/products/${product.images[1]}`
            : `/products/${product.images[0]}`
    }, [isHovered, product.images]);


    return (
        <Grid
            item
            xs={6}
            sm={4}
            onMouseEnter={() => setIsHoverated(true)}
            onMouseLeave={() => setIsHoverated(false)}
        >
            <Card>
                <NextLink href={'/product/slug'} passHref prefetch={false}>
                    <Link>
                        <CardActionArea>
                            <CardMedia          //carga bajo demanda
                                component={'img'}
                                className='fadeIn'
                                image={productImage}
                                alt={product.title}
                                onLoad={() => setIsImageLoaded(true)}
                            // onLoad={() => console.log('termino carga')}      //loader
                            />
                            {/* NOTE: otra forma  */}
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>
            <Box
                sx={{
                    mt: 1,
                    display: isImageLoaded ? 'block' : 'none'
                }}
                className='fadeIn'>
                <Typography fontWeight={600}>{product.title}</Typography>
                <Typography fontWeight={600}>${product.price}</Typography>
            </Box>
        </Grid>
    )
};





{/* {isHovered
                        ? (
                            <CardMedia
                                component={'img'}
                                className='fadeIn'
                                image={`products/${product.images[1]}`}
                                alt={product.title}
                            />
                        )
                        : (
                            <CardMedia
                                component={'img'}
                                className='fadeIn'
                                image={`products/${product.images[0]}`}
                                alt={product.title}
                            />
                        )} */}