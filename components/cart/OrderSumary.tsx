import { FC, useContext } from 'react';
import { Grid, Typography } from '@mui/material';

import { CartContext } from '@/context';
import { currency } from '@/utilities';

interface Props {
    OrderValues?: {
        numberOfItems: number
        subTotal: number
        total: number
        tax: number
    }
}

export const OrderSumary: FC<Props> = ({ OrderValues }) => {

    const { numberOfItems, subTotal, tax, total } = useContext(CartContext);
    const sumaryValues = OrderValues ? OrderValues : { numberOfItems, subTotal, total, tax }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography >No. Products</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{sumaryValues.numberOfItems} {sumaryValues.numberOfItems > 1 ? 'products' : 'product'}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(sumaryValues.subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{currency.format(sumaryValues.tax)}</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
                <Typography variant='subtitle1'>{currency.format(sumaryValues.total)}</Typography>
            </Grid>
        </Grid>
    )
};
