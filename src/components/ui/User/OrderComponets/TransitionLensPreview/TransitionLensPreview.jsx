import React, { useEffect, useState } from 'react';
import './TransitionLensPreview.css'; // Create this CSS file

// Import your sun and moon icons/images
import sunIcon from '/images/order/sun.png';
import moonIcon from '/images/order/Moon.png';

function ProductView({ customization }) {
  const [loaded, setLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDark((prev) => !prev);
    }, 2000); // Switch shades every 2 seconds (adjust as needed)

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Trigger the animation when the component is mounted
    setLoaded(true);
  }, []);

  const imageAnimationClass = loaded
    ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000'
    : 'translate-y-20 opacity-0';
  const textAnimationClass = loaded
    ? 'translate-y-0 opacity-100 transition-transform ease-out duration-1000 delay-500'
    : 'translate-y-20 opacity-0';

  return (
    <div className='flex flex-col'>
      <div className='bg-gray-700 w-full flex flex-row text-white p-2'>
        <p className='w-[20%] text-sm justify-center flex items-center cursor-pointer mb-2'>&lt; Back to frame</p>
        <p className='w-[60%] mx-auto text-lg justify-center flex mb-4'>Lens Preview</p>
        <p className='w-[20%]'></p>
      </div>
      <div className='p-8 bg-white mt-[-15px] rounded-md'></div>

      <div className={`flex flex-col items-center transform ${imageAnimationClass}`}>
        <img
          src={customization.image}
          alt="logo"
          className={`w-[300px] h-[300px] transition duration-1000 ${isDark ? 'filter brightness-50' : 'filter brightness-150'}`}
        />
        <p className="mt-2 text-center text-xl font-semibold">{customization.name}</p>
        <div className='flex flex-row items-center justify-center mr-10 ml-10'>
          {/* Display the sun and moon icons based on the isDark state */}
          <div className='flex flex-row items-center justify-center mr-10 ml-10'>
            {/* Display the sun and moon icons based on the isDark state */}
            <div className='w-[500px] h-[80px] flex items-center justify-between'>
              <span className="text-base font-sans font-bold text-gray-500 mr-2">Indoor</span>
              <hr className="w-[100px] border-t border-gray-300 h-0 my-0 mx-2" />
              <div className='px-6 flex justify-center items-center'>
                {isDark ? (
                  <img
                    src={moonIcon}
                    alt="Moon Icon"
                    className="w-[80px] h-[80px] transition duration-1000 filter brightness-50"
                  />
                ) : (
                  <img
                    src={sunIcon}
                    alt="Sun Icon"
                    className="w-[100px] h-[100px] transition duration-1000 filter brightness-150"
                  />
                )}
              </div>
              <hr className="w-[100px] border-t border-gray-300 h-0 my-0 mx-2" />
              <span className="ml-2 text-base font-sans font-bold text-gray-500">Outdoor</span>
            </div>
          </div>



        </div>
      </div>
      <div className={`mt-10 m-10 bg-gray-100 rounded-sm p-3 transform ${textAnimationClass}`}>
        <h5 className="font-sans text-xl font-bold">Gray Polarized Lens</h5>
        <p className="font-sans text-base">
          Gray polarized lenses reduce glare and provide clear vision in bright conditions while maintaining natural color perception. They are ideal for outdoor activities and offer UV protection.
        </p>
      </div>
    </div>
  );
}

export default ProductView;
