// reducer.js

// Define action type
const UPDATE_CART_ITEMS = 'UPDATE_CART_ITEMS';

// Initial state for the cart
const initialState = {
  items: [],
};

// Reducer function
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART_ITEMS:
      // Update cart items
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
};

// Action creator for updating cart items
export const updateCartItems = (cartItems) => ({
  type: UPDATE_CART_ITEMS,
  payload: cartItems,
});

export default cartReducer;
