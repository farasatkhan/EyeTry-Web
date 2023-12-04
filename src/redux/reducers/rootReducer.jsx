// rootReducer.js
import { combineReducers } from 'redux';
import orderSelectionReducer from './orderSelectionReducer';
import cartItemsReducer from './cartItemsReducer';

// Import other reducers as needed

const rootReducer = combineReducers({
  selectedOptions: orderSelectionReducer,
  cartItemsNumber: cartItemsReducer,
});

export default rootReducer;
