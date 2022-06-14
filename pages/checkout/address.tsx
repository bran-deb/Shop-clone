import { useContext } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { Box, Button, FormControl, Grid, Link, MenuItem, Select, TextField, Typography } from "@mui/material";

import Cookies from 'js-cookie';
import { ShopLayout } from "../../components/layouts";
import { CartContext } from '../../context';
import { countries } from '../../utilities';


type FormData = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
    }
}

const Addres = () => {

    const router = useRouter()
    const { updateAddress } = useContext(CartContext)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookies()
    })


    const onSubmitAddress = (data: FormData) => {
        updateAddress(data)
        router.push('/checkout/sumary')
    }


    return (
        <ShopLayout title={"Direccion"} pageDescription={"Confirmar direccion del destino"}>
            <Typography variant='h1' component='h1'>Direccion</Typography>

            <form onSubmit={handleSubmit(onSubmitAddress)}>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Nombre'
                            variant='filled'
                            fullWidth
                            {...register('firstName', {
                                required: 'Este campo es obligatorio',
                                minLength: { value: 2, message: 'Minimo 2 letras' }
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Apellido'
                            variant='filled'
                            fullWidth
                            {...register('lastName', {
                                required: 'Este campo es obligatorio',
                                minLength: { value: 3, message: 'Minimo 3 letras' }
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Direccion'
                            variant='filled'
                            fullWidth
                            {...register('address', {
                                required: 'Este campo es obligatorio',
                                minLength: { value: 5, message: 'Minimo 5 letras' }
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Direccion 2 (Opcional)'
                            variant='filled'
                            fullWidth
                            {...register('address2', {
                                minLength: { value: 5, message: 'Minimo 5 letras' }
                            })}
                            error={!!errors.address2}
                            helperText={errors.address2?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Codigo Postal'
                            variant='filled'
                            fullWidth
                            {...register('zip', {
                                required: 'Este campo es obligatorio',
                                minLength: { value: 4, message: 'Codigo zip contiene 4 caracteres' },
                                maxLength: { value: 4, message: 'Codigo zip contiene 4 caracteres' }
                            })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Ciudad'
                            variant='filled'
                            fullWidth
                            {...register('city', {
                                required: 'Este campo es obligatorio',
                                minLength: { value: 4, message: 'Minimo 4 letras' }
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth
                        >
                            <TextField
                                select
                                variant='filled'
                                label='Pais'
                                defaultValue={countries[10].code}
                                error={!!errors.country}
                                {...register('country', {
                                    required: 'Seleccione un pais',
                                })}
                            >
                                {countries.map(country => (
                                    <MenuItem
                                        key={country.code}
                                        value={country.code}>
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label='Telefono'
                            variant='filled'
                            fullWidth
                            {...register('phone', {
                                required: 'Este campo es obligatorio',
                                minLength: { value: 8, message: 'Minimo 8 caracteres' }
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button type='submit' color='secondary' className='circular-btn' size='large'>
                        Revisar pedido
                    </Button>
                </Box>
            </form >
        </ShopLayout >
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//     const { token = '' } = req.cookies
//     let isValidToken = false
//     //NOTE: Verificacion del usuario del lado del server
//     try {
//         await jwt.isValidToken(token)
//         isValidToken = true

//     } catch (error) {
//         isValidToken = false
//     }

//     if (!isValidToken) {
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false,
//             }
//         }
//     }

//     return {
//         props: {

//         }
//     }
// }

export default Addres;
