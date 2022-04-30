import { NextPage } from 'next';
import NextLink from 'next/link';

import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../../components/layouts';

const RegisterPage: NextPage = () => {
    return (
        <AuthLayout title={'Registro'}>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='nombre' variant='filled' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='apellido' variant='filled' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='correo' type='email' variant='filled' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='contraseña' type='password' variant='filled' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField label='confirmar contraseña' type='password' variant='filled' fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                        <NextLink href='/auth/login' passHref>
                            <Link>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Crear
                                </Button>
                            </Link>
                        </NextLink>
                    </Grid>

                    <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink href='/auth/login' passHref>
                            <Link underline='always'>
                                Ya tienes una cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    )
}

export default RegisterPage;
