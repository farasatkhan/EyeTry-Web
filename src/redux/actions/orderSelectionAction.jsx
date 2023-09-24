// actions.js
import { UPDATE_SELECTED_OPTIONS } from '../actions/actionTypes';

export const updateSelectedOptions = (options) => ({
    type: UPDATE_SELECTED_OPTIONS,
    payload: options,
  });
  
