import { useState, useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link'

import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from "../../components/layouts";
import { AuthContext } from '../../context';
import { validations } from '../../utilities';
import { teslaApi } from '../../api';


type FormData = {
    email: string,
    password: string,
}

const LoginPage: NextPage = () => {

    const router = useRouter()
    const { loginUser, } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [showError, setShowError] = useState(false);

    //  * "If the user is not logged in, show an error message for 3 seconds, otherwise redirect the user
    //  * to the home page."
    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false)
        const isValidLogin = await loginUser(email, password)

        if (!isValidLogin) {
            setShowError(true)
            setTimeout(() => { setShowError(false) }, 3000);
            return;
        }
        /* Checking if there is a query parameter called p, and if there is, it is redirecting to that
        page. If there is no query parameter, it is redirecting to the home page. */
        const destination = router.query.p?.toString() || '/'
        router.replace(destination)
    }

    return (
        <AuthLayout title={"Ingresar"}>
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">Iniciar Sesion</Typography>

                            <Chip
                                label='No se reconoce el usuario / contraseña'
                                color='error'
                                icon={<ErrorOutline />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'contents' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Correo'
                                type='email'
                                variant='filled'
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    /* A custom validation function. */
                                    validate: validations.isEmail
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label='Contraseña'
                                type='password'
                                variant='filled'
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: "Minimo 6 caracteres" }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            {/* <NextLink href='/' passHref>
                                <Link> */}
                            <Button
                                type="submit"
                                color="secondary"
                                className="circular-btn"
                                size="large"
                                fullWidth
                            >
                                Ingresar
                            </Button>
                            {/* </Link>
                            </NextLink> */}
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
            </form>
        </AuthLayout>
    )
}

export default LoginPage;
