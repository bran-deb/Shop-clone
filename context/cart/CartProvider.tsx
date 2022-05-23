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

    const addProductToCart = (product: ICartProduct) => {
        // const productsInCart = state.cart.filter((p:any) => p._id !== product._id && p !== product.size)
        // dispatch({ type: '[CART] - Add Product', payload: [...productsInCart.product] })
        const productInCart = state.cart.some(p => p._id === product._id)
        if (!productInCart) return dispatch({ type: '[CART] - Update Products in cart', payload: [...state.cart, product] })

        const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size)
        if (!productInCartButDifferentSize) return dispatch({ type: '[CART] - Update Products in cart', payload: [...state.cart, product] })

        //acumular
        const updatedProducts = state.cart.map(p => {
            if (p._id !== product._id) return p
            if (p.size !== product.size) return p

            //actualizar la cantidad
            p.quantity += product.quantity
            return p
        })
        dispatch({ type: '[CART] - Update Products in cart', payload: updatedProducts })
    }

    return (
        <CartContext.Provider value={{
            ...state,

            //methods
            addProductToCart
        }}>
            {children}
        </CartContext.Provider>
    )
}