import NextLink from 'next/link'

import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

export const Navbar = () => {
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
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <NextLink href='/category/men' passHref>
                        <Link underline='none'>
                            <Button >Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref>
                        <Link underline='none'>
                            <Button>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kid' passHref>
                        <Link underline='none'>
                            <Button>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1} />
                <IconButton>
                    <SearchOutlined />
                </IconButton>

                {/* cart shopping*/}
                <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color='secondary'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button>
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    )
};
