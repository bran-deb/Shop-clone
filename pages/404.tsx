import { NextPage } from "next";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import image404 from '@/public/img/404.svg'

const Custom404: NextPage = () => {
    return (
        <ShopLayout title="Page not found" pageDescription="No hay contenido aqui">
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}//responsive
            >
                <Image height={300} width={300} src={image404} alt="pagina no encontrada" draggable="false" />
                {/* <Typography variant="h1" component='h1' fontSize={60} fontWeight={100}>404 | </Typography> */}
                <Typography ml={2}>| No se encontro la pagina</Typography>
            </Box>
        </ShopLayout>
    )
};

export default Custom404;
