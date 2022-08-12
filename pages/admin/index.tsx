import React from "react";
import { DashboardOutlined } from "@mui/icons-material";
import { AdminLayout } from "@/components/layouts";


const DashboardPage = () => {
    return (
        <AdminLayout
            title='DashBoard'
            subTitle='Estadisticas generales'
            icon={<DashboardOutlined />}
        >
            <h3>Hola desde DashBoard</h3>
        </AdminLayout>
    )
};

export default DashboardPage;
