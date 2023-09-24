// CartComponent.js

import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const selectedOptions = useSelector((state) => state.selectedOptions);

  // Convert the selectedOptions object to a JSON string with pretty formatting
  const selectedOptionsJSON = JSON.stringify(selectedOptions, null, 2);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <pre>
        <code>{selectedOptionsJSON}</code>
      </pre>
    </div>
  );
};

export default Cart;
