import React, { useState } from "react";
import { Link } from "react-router-dom";
import clear from '/images/order/clear.svg'
import bluelight from '/images/order/bluelight.svg'
import transition from '/images/order/transition.svg'
import sunglasses from '/images/order/sunglasses.svg'

export default function SelectLensTypeComponentProp() {
  return (
    <div>
      <h1 className="font-sans md:mt-0 font-semibold text-3xl mx-auto mb-10 mt-12">Select Lens Type</h1>
      <Link to="/order/available_coatings">
                <div className="flex flex-row fixed-div mb-3 bg-white border-4 border-gray-300 hover:bg-gray-200 rounded-lg ">
                    <div className="w-[20%] flex items-center bg-white">
                        <img className="h-[60px] ml-5" src={clear} alt="free silver package" />
                    </div>
                    <div class="w-[75%] p-4">
                        <h2 class="text-xl font-bold mb-2">Clear</h2>
                        <p class=" text-sm font-sans">Lenses for everyday use</p>
                    </div>
                </div>
            </Link>
            
            <Link to="/order/available_coatings">
                <div className="flex flex-row fixed-div mb-3 bg-white border-4 border-gray-300 rounded-lg hover:bg-gray-200 ">
                    <div className="w-[20%] flex items-center bg-white">
                        <img className="h-[60px] ml-5" src={bluelight} alt="free silver package" />
                    </div>
                    <div class="w-[75%] p-4">
                        <h2 class="text-xl font-bold mb-2">Blue Light Lenses (+$39 +$19.50)</h2>
                        <p class=" text-sm font-sans">Protect your eyes from the emissions of digital devices</p>
                    </div>
                </div>
            </Link>
            
            <Link to="/order/available_coatings">
                <div className="flex flex-row fixed-div mb-3 bg-white border-4 rounded-lg border-gray-300 hover:bg-gray-200">
                    <div className="w-[20%] flex items-center bg-white">
                        <img className="h-[60px] ml-2" src={transition} alt="free silver package" />
                    </div> 
                    <div class="w-[75%] p-4">
                        <h2 class="text-xl font-bold mb-2">Transition / Photochromic (From +$69 +$34.50)</h2>
                        <p class=" text-sm font-sans">Darken when outdoors, fade back to clear indoors</p>
                    </div>
                </div>
            </Link>
            
            <Link to="/order/sunglasses_lens_selection">
                <div className="flex flex-row fixed-div mb-3 bg-white border-4 rounded-lg border-gray-300 hover:bg-gray-200">
                    <div className="w-[20%] flex items-center bg-white ">
                        <img className="h-[60px] ml-5" src={sunglasses} alt="free silver package" />
                    </div>
                    <div class="w-[75%] p-4">
                        <h2 class="text-xl font-bold mb-2">Sunglasses (From +$29 +$14.50)</h2>
                        <p class=" text-sm font-sans">Tints, Mirrored or Polarized</p>
                    </div>
                </div>
            </Link>

    </div>
  )
}

// export default function SelectLensType() {
//   const [name, setName] = useState("JACKSON");
//   const [description, setDescription] = useState("Cat Eye Eyeglasses");
//   const [price, Price] = useState("$149.00");

//   return (

//     <SelectLensTypeScreen screenComponent={<SelectLensTypeComponentProp/>} name={name} price={price} description={description} />

//   );
// }

