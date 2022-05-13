import { NextPage } from 'next'

import { Typography } from "@mui/material"

import { useProducts } from "../../hooks"
import { ProductList } from "../../components/products"
import { ShopLayout } from "../../components/layouts"
import { FullScreenLoading } from "../../components/ui"


const KidPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=kid')

    return (
        <ShopLayout title={"Tesla shop: niños"} pageDescription={"Encuentra los mejores productos de tesla para niños"}>
            <Typography variant="h1" component='h1' >Categoria: Niños</Typography>
            <Typography variant="h2" component='h2' sx={{ mb: 1 }}>Todos los productos para niños</Typography>
            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default KidPage