import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { Card, Grid, CardContent, Typography, Divider, Box, Chip } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { CartList, OrderSumary } from '@/components/cart';
import { AdminLayout } from '@/components/layouts';
import { dbOrders } from '@/database';
import { IOrder } from '@/interfaces';

export type OrderResponseBody = {
    id: string;
    status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED"
}

interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { isPaid, numberOfItems, orderItems, shippingAddress, _id: id, total, tax, subTotal } = order

    const payStatus = () => {
        if (isPaid) {
            return <Chip
                sx={{ my: 2 }}
                label='Orden ya fue pagada'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
            />
        }
        else {
            return <Chip
                sx={{ my: 2 }}
                label='Pendiente de pago'
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined />}
            />
        }
    }

    return (
        <AdminLayout
            title='Resumen de la orden'
            subTitle={`OrdenId:${order._id}`}
            icon={<AirplaneTicketOutlined />}
        >

            {payStatus()}

            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    <CartList products={orderItems} />
                </Grid>

                <Grid item xs={12} sm={5} >
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ({numberOfItems} {numberOfItems > 1 ? 'producto' : 'productos'})</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between' >
                                <Typography variant='subtitle1'>Direccion de entrega</Typography>
                            </Box>

                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.address} {shippingAddress.address2 ? `${shippingAddress.address2}` : ''}</Typography>
                            <Typography>{shippingAddress.city}</Typography>
                            <Typography>{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <OrderSumary OrderValues={{ numberOfItems, subTotal, total, tax, }} />

                            <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>

                                {/* estado de pago */}
                                <Box flexDirection='column' sx={{ display: 'flex', flex: 1 }}>
                                    {payStatus()}
                                </Box>
                            </Box>


                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id = '' } = query
    const session: any = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        }
    }

    /* Getting the order from the database. */
    const order = await dbOrders.getOrderById(id.toString())

    if (!order) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage
