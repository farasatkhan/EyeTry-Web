import React, { useState } from "react";
import clear from '/images/order/clear.svg'
import bluelight from '/images/order/bluelight.svg'
import transition from '/images/order/transition.svg'
import sunglasses from '/images/order/sunglasses.svg'

export default function SelectLensTypeComponent({onNextStep}) {
    

    // for navigation
    const handleNext = (step) => {
        // Call the parent's handleNextStep function when the element is clicked
        onNextStep(step);
    };

    return (
        <div>
            <h1 className="font-sans font-semibold text-3xl mx-auto mb-10 ">Select Glasses Type</h1>
            
            <div onClick={()=>handleNext(10)} className="flex flex-row fixed-div mb-3 bg-white border-2 border-gray-300 hover:bg-gray-200 rounded-lg ">
                <div className="w-[20%] flex items-center rounded-l-lg">
                    <img className="h-[60px] ml-5" src={clear} alt="free silver package" />
                </div>
                <div class="w-[75%] p-4">
                    <h2 class="text-xl font-bold mb-2">Clear</h2>
                    <p class=" text-sm font-sans">Lenses for everyday use</p>
                </div>
            </div>

            <div onClick={()=>handleNext(10)} className="flex flex-row fixed-div mb-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-200 ">
                <div className="w-[20%] flex items-center rounded-l-lg">
                    <img className="h-[60px] ml-5" src={bluelight} alt="free silver package" />
                </div>
                <div class="w-[75%] p-4">
                    <h2 class="text-xl font-bold mb-2">Blue Light Lenses (+$39 +$19.50)</h2>
                    <p class=" text-sm font-sans">Protect your eyes from the emissions of digital devices</p>
                </div>
            </div>

            <div onClick={() => handleNext(8)} className="flex flex-row fixed-div mb-3 bg-white border-2 rounded-lg border-gray-300 hover:bg-gray-200">
                <div className="w-[20%] flex items-center rounded-l-lg">
                    <img className="h-[60px] ml-2" src={transition} alt="free silver package" />
                </div>
                <div class="w-[75%] p-4">
                    <h2 class="text-xl font-bold mb-2">Transition / Photochromic (From +$69 +$34.50)</h2>
                    <p class=" text-sm font-sans">Darken when outdoors, fade back to clear indoors</p>
                </div>
            </div>

            <div onClick={() => handleNext(9)} className="flex flex-row fixed-div mb-3 bg-white border-2 rounded-lg border-gray-300 hover:bg-gray-200">
                <div className="w-[20%] flex items-center rounded-l-lg">
                    <img className="h-[60px] ml-5" src={sunglasses} alt="free silver package" />
                </div>
                <div class="w-[75%] p-4">
                    <h2 class="text-xl font-bold mb-2">Sunglasses (From +$29 +$14.50)</h2>
                    <p class=" text-sm font-sans">Tints, Mirrored or Polarized</p>
                </div>
            </div>
        </div>
    )
}


