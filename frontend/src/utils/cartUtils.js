// Helper function to add decimals and format numbers correctly
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Function to update the cart's prices
export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping price (example logic: free shipping over $100, else $10)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate tax price (example tax rate: 15%)
  state.taxPrice = addDecimals(0.15 * state.itemsPrice);

  // Calculate total price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
  );

  return state;
};
