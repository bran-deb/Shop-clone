import { FC, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';

import { ICartProduct, IOrder, ShippingAddress } from '../../interfaces';
import { cartReducer, CartContext } from './';
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
                firstName: Cookie.get('firstName') || '',
                lastName: Cookie.get('lastName') || '',
                address: Cookie.get('address') || '',
                address2: Cookie.get('address2') || '',
                zip: Cookie.get('zip') || '',
                city: Cookie.get('city') || '',
                country: Cookie.get('country') || '',
                phone: Cookie.get('phone') || '',
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
        Cookie.set('firstName', address.firstName);
        Cookie.set('lastName', address.lastName);
        Cookie.set('address', address.address);
        Cookie.set('address2', address.address2 || '');
        Cookie.set('zip', address.zip);
        Cookie.set('city', address.city);
        Cookie.set('country', address.country);
        Cookie.set('phone', address.phone);

        dispatch({ type: '[CART] - Update Address', payload: address })
    }

    const createOrder = async (): Promise<{ hasError: boolean; message: string; }> => {

        if (!state.shippingAddress) {
            throw new Error('No hay direccion de entrega')
        }

        const body: IOrder = {
            orderItems: state.cart.map(p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false
        }

        try {
            const { data } = await teslaApi.post<IOrder>('/orders', body)

            dispatch({ type: '[CART] - Order complete' });

            return {
                hasError: false,
                message: data._id!
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                // const axiosError: string = error.response?.data.message
                return {
                    hasError: true,
                    message: error.message
                }
            }
            return {
                hasError: true,
                message: 'Error no controlado con el administrador'
            }
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