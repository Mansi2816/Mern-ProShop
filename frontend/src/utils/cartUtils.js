
export const addDecimals = (num) => {
    return (Math.round(num*100)/100).toFixed(2)
}


export const updateCart = (state) => {
   
        // Calculate items price
        state.itemsPrice = addDecimals(Number(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2));
  
        // Calculate shipping price (example logic: free shipping over $100, else $10)
        state.shippingPrice = addDecimals (Number(state.itemsPrice > 100 ? 0 : 10));
  
        // Calculate tax price (example tax rate: 15%)
        state.taxPrice = addDecimals(Number((0.15 *state.itemsPrice).toFixed(2)))
  
        // Calculate total price
        state.totalPrice = addDecimals(Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice))

  return state
}