import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

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

    //NOTE:si alguien manipula la cookie se lo previene previene con un []
    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({ type: '[CART] - LoadCart from cookies | storage', payload: cookieProducts })
        } catch (error) {
            dispatch({ type: '[CART] - LoadCart from cookies | storage', payload: [] })
        }
    }, [])

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

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

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[CART] - Change cart quantity', payload: product })
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[CART] - Remove product in cart', payload: product })
    }

    return (
        <CartContext.Provider value={{
            ...state,

            //methods
            addProductToCart,
            removeCartProduct,
            updateCartQuantity,
        }}>
            {children}
        </CartContext.Provider>
    )
}