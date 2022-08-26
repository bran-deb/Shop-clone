import { NextPage } from "next";
import { ConfirmationNumberOutlined } from '@mui/icons-material';

import { AdminLayout } from "@/components/layouts";


const OrdersPage: NextPage = () => {
    return (
        <AdminLayout
            title={'Ordenes'}
            subTitle={'Mantenimiento de ordenes'}
            icon={<ConfirmationNumberOutlined />}>

        </AdminLayout>
    )
}

export default OrdersPage;
