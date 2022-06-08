import { useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utilities';
import { teslaApi } from '../../api';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage: NextPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    // console.log({ errors });
    const [showError, setShowError] = useState(false);

    const onRegisterForm = async ({ name, email, password }: FormData) => {
        try {
            setShowError(false)
            const { data } = await teslaApi.post('/user/register', { name, email, password })
            const { token, user } = data
            console.log({ token, user });

        } catch (error) {
            setShowError(true)
            setTimeout(() => { setShowError(false) }, 3000);
            console.log('error en las credenciales');
        }
    }

    return (
        <AuthLayout title={'Registro'}>
            <form onSubmit={handleSubmit(onRegisterForm)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Crear cuenta</Typography>

                            <Chip
                                label='Ya se registro esta direccion de correo'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'contents' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='nombre'
                                type='text'
                                variant='filled'
                                {...register('name', {
                                    required: 'Este campo es obligatorio',
                                    minLength: { value: 2, message: 'Minimo 2 letras' }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='correo'
                                type='email'
                                variant='filled'
                                {...register('email', {
                                    required: 'Este campo es obligatorio',
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='contraseña'
                                type='password'
                                variant='filled'
                                {...register('password', {
                                    required: 'Este campo es obligatorio',
                                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            {/* <NextLink href='/auth/login' passHref>
                                <Link> */}
                            <Button
                                type='submit'
                                color='secondary'
                                className='circular-btn'
                                fullWidth
                            >
                                Crear
                            </Button>
                            {/* </Link>
                            </NextLink> */}
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
            </form>
        </AuthLayout>
    )
}

export default RegisterPage;
