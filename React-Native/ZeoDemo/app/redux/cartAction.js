export const ADD_TO_CART = "ADD_TO_CART" // ACTION TYPE 
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART"

/**
 * 
 * @param {*} item 
 * @returns 
 * @description add to cart action
 */
 export const addToCart = (item)=>({
    type: ADD_TO_CART,
    payload : item
}) 

/**
 * 
 * @returns 
 * @description remove from cart action
 */
 export const removeAllFromCart = ()=>({
    type: REMOVE_ALL_FROM_CART,
    payload : {}
}) 
