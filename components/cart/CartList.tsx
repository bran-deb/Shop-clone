import { Typography } from "@mui/material"
import { FC } from "react"
import { initialData } from "../../database/products"


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export const CartList: FC = () => {
    return (
        <>
            {
                productsInCart.map(product => (
                    <Typography key={product.slug}>{product.title}</Typography>
                ))
            }
        </>
    )
}
