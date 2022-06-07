import NextLink from 'next/link'

import { NextPage } from 'next';

import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useForm } from 'react-hook-form';

import { AuthLayout } from "../../components/layouts";
import { validations } from '../../utilities';


type FormData = {
    email: string,
    password: string,
}

const LoginPage: NextPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    console.log({ errors });

    const onLoginUser = (data: FormData) => {
        console.log({ data });

    }

    return (
        <AuthLayout title={"Ingresar"}>
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1" component="h1">Iniciar Sesion</Typography>
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
