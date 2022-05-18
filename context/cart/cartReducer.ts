import { cartState } from "./"
import { ICartProduct } from '../../interfaces/cart';


type CartActionType =
    | { type: '[CART] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[CART] - Add Product', payload: ICartProduct }

export const cartReducer = (state: cartState, action: CartActionType) => {

    switch (action.type) {
        case '[CART] - LoadCart from cookies | storage':
            return { ...state }
        case '[CART] - Add Product':
            return { ...state }

        default:
            return state
    }
}