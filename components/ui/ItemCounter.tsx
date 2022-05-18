import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";



interface Props {
    maxValue: number
    currentValue: number

    //methods
    updateQuantity: (quantity: number) => void
}


export const ItemCounter: FC<Props> = ({ maxValue, currentValue, updateQuantity }) => {

    const removeButton = () => {
        if (currentValue > 1) return updateQuantity(currentValue - 1)
    }
    const addButton = () => {
        if (currentValue < maxValue) return updateQuantity(currentValue + 1)
    }


    return (
        <Box display='flex' alignItems='center'>
            <IconButton onClick={removeButton}>
                <RemoveCircleOutline />
            </IconButton>

            <Typography sx={{ width: 40, textAlign: 'center' }} variant="h1" >{currentValue}</Typography>
            <IconButton onClick={addButton}>
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
};
