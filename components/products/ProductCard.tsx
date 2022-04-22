import { FC } from "react";

import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";

import { IProduct } from "../../interfaces";


interface Props {
    product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {
    return (
        <>
            <Grid item xs={6} sm={4} >
                <Card>
                    <CardActionArea>
                        <CardMedia          //carga bajo demanda
                            component={'img'}
                            image={`products/${product.images[0]}`}
                            alt={product.title}
                        />
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    )
};
