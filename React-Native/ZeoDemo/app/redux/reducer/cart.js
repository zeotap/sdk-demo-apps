import { ADD_TO_CART, REMOVE_ALL_FROM_CART } from "../cartAction"; //action

const intiialState = {
    cartItems :[] // multiple
}


export default function (state =intiialState,action) {
const {type, payload} =action
    switch (type) {
        case ADD_TO_CART: 
       return  {
            ...state,
            cartItems : [...state.cartItems, payload]
        }
        case REMOVE_ALL_FROM_CART: 
       return  {
            ...state,
            cartItems : []
        }
    
        default:
            return state
    }
    
} 