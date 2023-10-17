import React, { useState } from "react";

const ColorsFilter = ({ selectedColor, onColorSelect }) => {
    const colorOptions = ['All Colors', 'Black', 'Blue', 'Brown', 'Green', 'Red', 'Yellow', 
    'Purple', 'Orange', 'White', 'Transparent', 'Silver', 'Gray', 'Gold', 'Pink'];

  const handleColorClick = (color) => {
    // Update the selected color when a color is clicked
    onColorSelect(color);
  };

  return (
    <>
      <div className="absolute left-0 p-2 bg-white rounded-md shadow-lg z-50 w-[300px]">
        <ul className="space-y-2">
          {colorOptions.map((color, index) => (
            <li
              key={index}
              className={`rounded-sm py-1 px-2 transition duration-200 ease-in-out ${
                selectedColor === color ? 'bg-gray-700 hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <div
                className="cursor-pointer flex items-center"
                onClick={() => handleColorClick(color)}
              >
                <div
                  className="rounded-full w-5 h-5 mr-2"
                  style={{ backgroundColor: color.toLowerCase() }}
                ></div>
                <span
                  className={`font-sans ${
                    selectedColor === color ? 'text-white' : ''
                  }`}
                >
                  {color}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ColorsFilter;
