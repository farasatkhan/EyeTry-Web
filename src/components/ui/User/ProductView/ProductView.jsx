import React, { useEffect, useState } from 'react';

function ProductView({ customization }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger the animation when the component is mounted
    setLoaded(true);
  }, []);

  const imageAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000' : 'translate-y-20 opacity-0';
  const textAnimationClass = loaded ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000 delay-500' : 'translate-y-20 opacity-0';

  return (
    <div className='flex flex-col'>
      <div className='bg-gray-800 w-full flex flex-row text-white p-2'>
        <p className='w-[20%] text-sm justify-center flex items-center cursor-pointer mb-2'>&lt; Back to frame</p>
        <p className='w-[60%] mx-auto text-lg justify-center flex mb-4'>Lens Preview</p>
        <p className='w-[20%]'></p>
      </div>
      <div className='p-8 bg-white mt-[-15px] rounded-xl'></div>

      <div className={`flex flex-col items-center transform ${imageAnimationClass}`}>
        <img
          src={customization.image}
          alt="logo"
          className="w-[300px] h-[300px]"
        />
        <p
          className="mt-2 text-center text-xl font-semibold"
        >
          {customization.name}
        </p>
      </div>
      <div className={`mt-16 m-10 bg-gray-100 rounded-lg p-3 transform ${textAnimationClass}`}>
        <h5 className="font-sans text-2xl font-bold">Gray Polarized Lens</h5>
        <p className="font-sans text-base  ">
          Gray polarized lenses reduce glare and provide clear vision in bright conditions while maintaining natural color perception. They are ideal for outdoor activities and offer UV protection.
        </p>
      </div>
    </div>
  );
}

export default ProductView;
