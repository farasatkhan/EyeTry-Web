// rootReducer.js
import { combineReducers } from 'redux';
import orderSelectionReducer from './orderSelectionReducer';
// Import other reducers as needed

const rootReducer = combineReducers({
  selectedOptions: orderSelectionReducer,
  // Add other reducers here
});

export default rootReducer;
