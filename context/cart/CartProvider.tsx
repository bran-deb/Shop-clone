import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct, ShippingAddress } from '../../interfaces';
import { cartReducer } from './';
import { CartContext } from './';
import Cookies from 'js-cookie';
import { teslaApi } from '../../api';





export interface cartState {
    isLoaded: boolean
    cart: ICartProduct[]

    numberOfItems: number
    subTotal: number
    tax: number
    total: number

    shippingAddress?: ShippingAddress
}

const CART_INITIAL_STATE: cartState = {
    isLoaded: false,
    cart: [],

    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
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

        if (Cookie.get('firstName')) {
            const shippingAddress = {
                firstName: Cookies.get('firstName') || '',
                lastName: Cookies.get('lastName') || '',
                address: Cookies.get('address') || '',
                address2: Cookies.get('address2') || '',
                zip: Cookies.get('zip') || '',
                city: Cookies.get('city') || '',
                country: Cookies.get('country') || '',
                phone: Cookies.get('phone') || '',
            }

            dispatch({ type: '[CART] - LoadAddress from Cookies', payload: shippingAddress })
        }
    }, [])

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])

    useEffect(() => {
        const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0)
        const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0)
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)

        const orderSumary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1),
        }
        dispatch({ type: '[CART] - Update order sumary', payload: orderSumary })
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

    const updateAddress = (address: ShippingAddress) => {
        Cookies.set('firstName', address.firstName);
        Cookies.set('lastName', address.lastName);
        Cookies.set('address', address.address);
        Cookies.set('address2', address.address2 || '');
        Cookies.set('zip', address.zip);
        Cookies.set('city', address.city);
        Cookies.set('country', address.country);
        Cookies.set('phone', address.phone);

        dispatch({ type: '[CART] - Update Address', payload: address })
    }

    const createOrder = async () => {
        try {
            const { data } = await teslaApi.post('/orders')
            console.log({ data });

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <CartContext.Provider value={{
            ...state,

            //methods
            addProductToCart,
            removeCartProduct,
            updateCartQuantity,
            updateAddress,

            //orders
            createOrder,
        }}>
            {children}
        </CartContext.Provider>
    )
}