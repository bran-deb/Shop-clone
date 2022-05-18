import { FC, useReducer } from 'react';

import { ICartProduct } from '../../interfaces';
import { cartReducer } from './';
import { CartContext } from './';




export interface cartState {
    cart: ICartProduct[]
}

const CART_INITIAL_STATE: cartState = {
    cart: []
}

export const CartProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);


    return (
        <CartContext.Provider value={{
            ...state
        }}>
            {children}
        </CartContext.Provider>
    )
}