import { useState, useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { getSession, signIn, getProviders } from 'next-auth/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link'
import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material";
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from "@/components/layouts";
import { validations } from '@/utilities';


type FormData = {
    email: string,
    password: string,
}

const LoginPage: NextPage = () => {

    const router = useRouter()
    // const { loginUser, } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [showError, setShowError] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
            console.log(prov);

        })
    }, [])


    //  * "If the user is not logged in, show an error message for 3 seconds, otherwise redirect the user
    //  * to the home page."
    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false)
        // const isValidLogin = await loginUser(email, password)

        // if (!isValidLogin) {
        //     setShowError(true)
        //     setTimeout(() => { setShowError(false) }, 3000);
        //     return;
        // }
        // /* Checking if there is a query parameter called p, and if there is, it is redirecting to that
        // page. If there is no query parameter, it is redirecting to the home page. */
        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination)
        await signIn('credentials', { email, password })
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
                            <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
                                passHref>
                                <Link underline='always'>
                                    Aun no tiene cuenta?
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={12} display='flex' flexDirection='column' justifyContent='end'>
                            <Divider sx={{ width: '100', mb: 2 }} />
                            {
                                Object.values(providers).map((provider: any) => {

                                    if (provider.id === 'credentials') return (<div key='credentials'></div>)

                                    return (
                                        <Button
                                            key={provider.id}
                                            variant="outlined"
                                            fullWidth
                                            color='primary'
                                            sx={{ mb: 1 }}
                                            onClick={() => signIn(provider.id)}
                                        >
                                            {provider.name}
                                        </Button>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage;



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