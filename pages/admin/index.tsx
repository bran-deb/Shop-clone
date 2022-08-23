import { FC, useState, useEffect } from 'react';
import { Grid, Typography } from "@mui/material";
import useSWR from 'swr';
import { DashboardOutlined, CreditCardOffOutlined, AttachMoneyOutlined, GroupAddOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, CategoryOutlined, AccessTimeOutlined } from '@mui/icons-material';

import { DashboardSummaryResponse } from "@/interfaces";
import { AdminLayout } from "@/components/layouts";
import { SumaryTile } from "@/components/admin";


const DashboardPage: FC = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 // 30 seg
    })
    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('tick');
            setRefreshIn(refreshIn ? refreshIn - 1 : 30)
        }, 1000)

        return () => clearInterval(interval)

    }, [refreshIn])

    if (!data && !error) return <></>

    if (error) {
        console.log(error)
        return <Typography>Error al cargar la informacion</Typography>
    }
    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders
    } = data!

    return (
        <AdminLayout
            title='DashBoard'
            subTitle='Estadisticas generales'
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>
                <SumaryTile
                    title={numberOfOrders}
                    subtitle="Ordenes totales"
                    icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={paidOrders}
                    subtitle="Ordenes pagadas"
                    icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={notPaidOrders}
                    subtitle="Ordenes pendientes"
                    icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={numberOfClients}
                    subtitle="Clientes"
                    icon={<GroupAddOutlined color='primary' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={numberOfProducts}
                    subtitle="Productos"
                    icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={productsWithNoInventory}
                    subtitle="Sin existencias"
                    icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={lowInventory}
                    subtitle="Bajo inventario"
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={refreshIn}
                    subtitle="Actualizacion en:"
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
            </Grid>
        </AdminLayout>
    )
};

export default DashboardPage;
