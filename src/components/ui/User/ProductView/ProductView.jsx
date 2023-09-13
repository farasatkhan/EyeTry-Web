import React from 'react';

function ProductView({ customization }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2>Product Preview</h2>
      <div className="flex flex-col items-center">
        <img src={customization.image} alt="logo" className="w-full h-full" />
        <p className="mt-2 text-center">{customization.name}</p>
      </div>
    </div>
  );
}

export default ProductView;
