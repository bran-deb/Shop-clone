import { useState, useContext } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import NextLink from 'next/link';

import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context';
import { validations } from '../../utilities';
import { teslaApi } from '../../api';
import { getSession, signIn } from 'next-auth/react';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage: NextPage = () => {

    const router = useRouter()
    const { registerUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const onRegisterForm = async ({ name, email, password }: FormData) => {
        setShowError(false)
        const { hasError, message } = await registerUser(name, email, password)
        if (hasError) {
            setShowError(true)
            setErrorMessage(message || '')
            setTimeout(() => { setShowError(false) }, 3000);
            return;
        }
        /* Checking if there is a query parameter called p, and if there is, it is redirecting to that
        page. If there is no query parameter, it is redirecting to the home page. */
        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination)
        await signIn('credentials', { email, password })
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
                            <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}
                                passHref>
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session = await getSession({ req })
    const { p = '/' } = query

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}