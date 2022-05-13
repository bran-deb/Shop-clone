import NextLiink from 'next/link'
import Image from "next/image";

import { Box, Link, Typography } from "@mui/material";

import { ShopLayout } from "../../components/layouts";
import image404 from "../../public/img/404.jpg"
import { RemoveShoppingCartOutlined } from "@mui/icons-material";


const EmptyPage = () => {
    return (
        <ShopLayout title="Page not found" pageDescription="No hay contenido aqui">
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}//responsive
            >
                <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
                <Box display='flex' flexDirection='column' alignItems='center'>
                    <Typography marginLeft={2}>Su carrito esta vacio</Typography>
                    <NextLiink href='/' passHref>
                        <Link typography="h4" color="secondary" underline='none'>
                            Regresar
                        </Link>
                    </NextLiink>
                </Box>
            </Box>
        </ShopLayout>
    )
};

export default EmptyPage