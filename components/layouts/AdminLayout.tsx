import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { AdminNavbar } from '@/components/admin';
import { SideMenu } from "@/components/ui";


interface Props {
    title: string
    subTitle: string
    icon?: JSX.Element
    children?: JSX.Element | JSX.Element[]
    //NOTE: types children in React 18
    // children?: ReactChild | ReactChild[]
    // children?: ReactNode
}


export const AdminLayout: FC<Props> = ({ title, subTitle, icon, children }) => {
    return (
        <>
            <nav>
                <AdminNavbar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                <Box display='flex' flexDirection='column'>
                    <Typography variant='h1' component='h1'>
                        {icon}
                        {title}
                    </Typography>
                    <Typography variant='h2' sx={{ mb: 1 }}>{subTitle}</Typography>
                </Box>

                <Box className='fadeIn'>
                    {children}
                </Box>
            </main>
        </>
    )
};
