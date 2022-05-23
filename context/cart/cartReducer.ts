import { cartState } from "./"
import { ICartProduct } from '../../interfaces/cart';


type CartActionType =
    | { type: '[CART] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[CART] - Update Products in cart', payload: ICartProduct[] }

export const cartReducer = (state: cartState, action: CartActionType) => {

    switch (action.type) {
        case '[CART] - LoadCart from cookies | storage':
            return { ...state }

        case '[CART] - Update Products in cart':
            return {
                ...state,
                cart: [...action.payload]
            }

        default:
            return state
    }
}