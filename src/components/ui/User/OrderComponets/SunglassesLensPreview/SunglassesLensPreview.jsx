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
      <button className="ml-10  mt-10 w-[20%] text-base font-bold mb-2 hover:text-blue-400  cursor-pointer">
        &lt; <span className="hover:underline">Back to frame</span></button>
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
        <h5 className="font-sans text-xl font-bold mb-2">Gray Polarized Lens</h5>
        <p className="font-sans text-base  ">
          Gray polarized lenses reduce glare and provide clear vision in bright conditions while maintaining natural color perception. They are ideal for outdoor activities and offer UV protection.
        </p>
      </div>
    </div>
  );
}

export default ProductView;
