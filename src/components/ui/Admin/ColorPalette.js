import React, { useState } from 'react';

const ColorPalette = ({ colors, selectedColors, onColorSelect }) => {
  const handleColorSelect = (color) => {
    if (selectedColors.includes(color)) {
      onColorSelect(selectedColors.filter((c) => c !== color));
    } else {
      onColorSelect([...selectedColors, color]);
    }
  };

  return (
    <div className="flex flex-wrap mt-4">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-8 h-8 rounded-full mr-2 mb-2 cursor-pointer ${
            selectedColors.includes(color) ? `border-4 border-${color}` : ''
          }`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorSelect(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorPalette;
