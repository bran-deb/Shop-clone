import { useContext, useState } from 'react';

import NextLink from 'next/link'
import { useRouter } from 'next/router';

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material";
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';

import { UIContext } from '../../context';
import { CartContext } from '../../context/cart/CartContext';

export const Navbar = () => {

    const { route, push } = useRouter()
    const { toggleSideMenu } = useContext(UIContext);
    const { numberOfItems } = useContext(CartContext);


    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);


    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        push(`/search/${searchTerm}`)
        setSearchTerm('')
    }


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
                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}
                    className='fadeIn'>
                    <NextLink href='/category/men' passHref>
                        <Link underline='none'>
                            <Button color={route === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' passHref>
                        <Link underline='none'>
                            <Button color={route === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kid' passHref>
                        <Link underline='none'>
                            <Button color={route === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box flex={1} />
                {/* pantalla desktop */}

                {
                    (isSearchVisible)
                        ? (
                            <Input
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                autoFocus
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' ? onSearchTerm() : null}
                                type='text'
                                placeholder="Buscar..."
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setIsSearchVisible(false)}>
                                            <ClearOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        )
                        : (
                            <IconButton sx={{ display: { xs: 'none', sm: 'flex' } }} className='fadeIn' onClick={() => setIsSearchVisible(true)}>
                                <SearchOutlined />
                            </IconButton>
                        )
                }

                {/* pantalla pequeña */}
                <IconButton sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={toggleSideMenu}>
                    <SearchOutlined />
                </IconButton>

                {/* cart shopping*/}
                <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={numberOfItems > 10 ? '+9' : numberOfItems} color='secondary'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={toggleSideMenu}>
                    Menu
                </Button>
            </Toolbar>
        </AppBar>
    )
};
