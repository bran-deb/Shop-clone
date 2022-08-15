import { FC } from "react";
import { Grid } from "@mui/material";
import { DashboardOutlined, CreditCardOffOutlined, AttachMoneyOutlined, GroupAddOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, CategoryOutlined, AccessTimeOutlined } from '@mui/icons-material';

import { AdminLayout } from "@/components/layouts";
import { SumaryTile } from "@/components/admin";


const DashboardPage: FC = () => {
    return (
        <AdminLayout
            title='DashBoard'
            subTitle='Estadisticas generales'
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2}>
                <SumaryTile
                    title={1}
                    subtitle="Ordenes totales"
                    icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={2}
                    subtitle="Ordenes pagadas"
                    icon={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={3}
                    subtitle="Ordenes pendientes"
                    icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={4}
                    subtitle="Clientes"
                    icon={<GroupAddOutlined color='primary' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={5}
                    subtitle="Productos"
                    icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={6}
                    subtitle="Sin existencias"
                    icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={7}
                    subtitle="Bajo inventario"
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SumaryTile
                    title={8}
                    subtitle="Actualizacion en:"
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
            </Grid>
        </AdminLayout>
    )
};

export default DashboardPage;
