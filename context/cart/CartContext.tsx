import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '@/interfaces';


interface ContextProps {
    cart: ICartProduct[]
    isLoaded: boolean

    numberOfItems: number
    subTotal: number
    tax: number
    total: number

    shippingAddress?: ShippingAddress

    //methods
    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
    updateAddress: (address: ShippingAddress) => void

    //orders
    createOrder: () => Promise<{ hasError: boolean; message: string; }>
}

export const CartContext = createContext({} as ContextProps)