import { Divider, Grid, Typography } from '@mui/material';



export const OrderSumary = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography >No. Products</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>SubTotal</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{`$${155.55}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Impuestos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>{`$${35.35}`}</Typography>
            </Grid>

            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
                <Typography variant='subtitle1'>{`$${200.65}`}</Typography>
            </Grid>
        </Grid>
    )
};
