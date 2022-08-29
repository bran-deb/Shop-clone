import { NextPage } from "next";
import { CardMedia, Grid } from "@mui/material";
import { CategoryOutlined } from '@mui/icons-material';
import { GridColDef, DataGrid, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from "swr";

import { AdminLayout } from "@/components/layouts";
import { IProduct } from "@/interfaces";


const columns: GridColDef[] = [
    {
        field: 'img',
        headerName: 'Foto',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <a href={`/product/${row.slug}`} target='_blak' rel='noreferrer'>
                    <CardMedia
                        component='img'
                        alt={row.title}
                        className='fadeIn'
                        image={`/products/${row.img}`}
                    />
                </a>
            )
        }
    },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'gender', headerName: 'Genero' },
    { field: 'type', headerName: 'Tipo' },
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },
    { field: 'sizes', headerName: 'Tallas', width: 250 },
]


const ProductsPage: NextPage = () => {

    const { data, error } = useSWR<IProduct[]>('/api/admin/products')

    if (!data && !error) return (<></>)

    const rows = data!.map(product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes.join(', '),
        slug: product.slug,
    }))

    return (
        <AdminLayout
            title={`Productos (${data?.length})`}
            subTitle={'Mantenimiento de productos'}
            icon={<CategoryOutlined />}
        >
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

export default ProductsPage