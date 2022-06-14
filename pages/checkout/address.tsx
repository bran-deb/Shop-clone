import { GetServerSideProps } from 'next'
import NextLink from 'next/link'

import { Box, Button, FormControl, Grid, Link, MenuItem, Select, TextField, Typography } from "@mui/material";

import { ShopLayout } from "../../components/layouts";
import { jwt } from '../../utilities';


const Addres = () => {
    return (
        <ShopLayout title={"Direccion"} pageDescription={"Confirmar direccion del destino"}>
            <Typography variant='h1' component='h1'>Direccion</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TextField label='Nombre' variant='filled' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Apellido' variant='filled' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Direccion' variant='filled' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Direccion 2 (Opcional)' variant='filled' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Codigo Postal' variant='filled' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Ciudad' variant='filled' fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select value={1} variant='filled' label='Pais'>
                            <MenuItem value={1}>Costa Rica</MenuItem>
                            <MenuItem value={2}>Honduras</MenuItem>
                            <MenuItem value={3}>El Salvador</MenuItem>
                            <MenuItem value={4}>Mexico</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField label='Telefono' variant='filled' fullWidth />
                </Grid>
            </Grid>

            <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                <NextLink href='/checkout/sumary' passHref>
                    <Link>
                        <Button color='secondary' className='circular-btn' size='large'>
                            Revisar pedido
                        </Button>
                    </Link>
                </NextLink>
            </Box>
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
