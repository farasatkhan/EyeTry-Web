import React, { useState } from 'react';

function CustomizeProduct({ onUpdate }) {
  const [frameColor, setFrameColor] = useState('black');
  const [lensType, setLensType] = useState('clear');
  
  // Handle user input and update the product
  const handleFrameColorChange = (color) => {
    setFrameColor(color);
    onUpdate({ frameColor: color, lensType });
  };
  
  const handleLensTypeChange = (type) => {
    setLensType(type);
    onUpdate({ frameColor, lensType: type });
  };

  return (
    <div>
      <h2>Customize Your Eyeglasses</h2>
      <div>
        <label>Frame Color:</label>
        <select onChange={(e) => handleFrameColorChange(e.target.value)}>
          <option value="black">Black</option>
          <option value="brown">Brown</option>
          <option value="silver">Silver</option>
        </select>
      </div>
      <div>
        <label>Lens Type:</label>
        <select onChange={(e) => handleLensTypeChange(e.target.value)}>
          <option value="clear">Clear</option>
          <option value="tinted">Tinted</option>
          <option value="polarized">Polarized</option>
        </select>
      </div>
    </div>
  );
}

export default CustomizeProduct;
