// actions.js
import { UPDATE_CART_ITEMS_NUMBER } from '../actions/actionTypes';

export const updatedCartItemsNumber = (options) => ({
    type: UPDATE_CART_ITEMS_NUMBER,
    payload: options,
  });
  
