import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';


interface ContextProps {
    cart: ICartProduct[]
    isLoaded: boolean

    numberOfItems: number
    subTotal: number
    tax: number
    total: number

    //methods
    addProductToCart: (product: ICartProduct) => void
    updateCartQuantity: (product: ICartProduct) => void
    removeCartProduct: (product: ICartProduct) => void
}

export const CartContext = createContext({} as ContextProps)