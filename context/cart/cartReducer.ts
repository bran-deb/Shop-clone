import { cartState } from "./"
import { ICartProduct } from '../../interfaces';


type CartActionType =
    | { type: '[CART] - LoadCart from cookies | storage', payload: ICartProduct[] }
    | { type: '[CART] - Update Products in cart', payload: ICartProduct[] }
    | { type: '[CART] - Change cart quantity', payload: ICartProduct }

export const cartReducer = (state: cartState, action: CartActionType) => {

    switch (action.type) {
        case '[CART] - LoadCart from cookies | storage':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[CART] - Update Products in cart':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[CART] - Change cart quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product
                    if (product.size !== action.payload.size) return product
                    return action.payload
                })
            }

        default:
            return state
    }
}