import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from '@/components/layouts';
import { NextPage } from 'next';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra informacion si esta pagada la orden o no',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='pagada' variant='outlined' />
                    : <Chip color='error' label='No pagada' variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'ver orden',
        description: 'Muestra informacion del producto',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    }
]

const rows = [
    { id: 1, paid: true, fullname: 'Fernando Herrera' },
    { id: 2, paid: false, fullname: 'Miguel Angel' },
    { id: 3, paid: true, fullname: 'Dan Abramov' },
    { id: 4, paid: false, fullname: 'Jeff Delaney' },
    { id: 5, paid: true, fullname: 'John Papa' },
    { id: 6, paid: false, fullname: 'Estefany Aguilar' },
]

interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    console.log({ orders });


    return (
        <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
            <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>

        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrderByUserId(session.user._id)

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage
