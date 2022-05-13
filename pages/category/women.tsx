import { Typography } from "@mui/material"

import { useProducts } from "../../hooks"
import { ProductList } from "../../components/products"
import { ShopLayout } from "../../components/layouts"
import { FullScreenLoading } from "../../components/ui"

const Women = () => {

    const { products, isLoading } = useProducts('/products?gender=women')

    return (
        <ShopLayout title={"Tesla shop: women"} pageDescription={"Encuentra los mejores productos de tesla para ellas"}>
            <Typography variant="h1" component='h1' >Categoria: Mujeres</Typography>
            <Typography variant="h2" component='h2' sx={{ mb: 1 }}>Todos los productos para mujeres</Typography>
            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default Women