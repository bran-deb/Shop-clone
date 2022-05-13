import { NextPage } from 'next';
import NextLink from 'next/link';

import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from "../../components/layouts";



const LoginPage: NextPage = () => {
    return (
        <AuthLayout title={"Ingresar"}>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1">Iniciar Sesion</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Correo' variant='filled' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='Contraseña' type='password' variant='filled' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <NextLink href='/' passHref>
                            <Link>
                                <Button color="secondary" className="circular-btn" size="large" fullWidth>
                                    Ingresar
                                </Button>
                            </Link>
                        </NextLink>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/register' passHref>
                            <Link underline='always'>
                                Aun no tiene cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default LoginPage;
