import { useContext } from 'react';
import NextLink from 'next/link'
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";

import { UIContext } from '@/context';


export const AdminNavbar = () => {

    const { toggleSideMenu } = useContext(UIContext);

    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center' underline='none'>
                        <Typography variant="h6">Tesla</Typography>
                        <Typography sx={{ ml: 0.5 }}> Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />

                <Button onClick={toggleSideMenu}>
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    )
};
