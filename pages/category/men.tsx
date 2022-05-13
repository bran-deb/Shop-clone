import { NextPage } from 'next';
import { Typography } from "@mui/material";

import { useProducts } from "../../hooks";
import { ProductList } from '../../components/products';
import { ShopLayout } from "../../components/layouts"
import { FullScreenLoading } from '../../components/ui';


const MenPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=men')

    return (
        <ShopLayout title={"Tesla shop: men"} pageDescription={"Encuentra los mejores productos de tesla para ellos"}>
            <Typography variant="h1" component='h1' >Categoria: Hombres</Typography>
            <Typography variant="h2" component='h2' sx={{ mb: 1 }}>Todos los productos para hombres</Typography>
            {
                isLoading
                    ? <FullScreenLoading />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default MenPage
