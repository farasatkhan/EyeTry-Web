// reducers.js
const initialState = {
  cartItemsNumber: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CART_ITEMS_NUMBER':
      return {
        ...state,
        cartItemsNumber: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
