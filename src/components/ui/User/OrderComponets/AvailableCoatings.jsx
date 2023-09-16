import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import superHydrophobic from '/superHydrophobic.svg'

export default function SelectLensTypeComponentProp() {
    
const [isClicked, setIsClicked] = useState(false);
  // Create a ref for the checkbox
  const checkboxRef = useRef(null);

  // Function to programmatically click the checkbox
  const handleClickOtherElement = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
      setIsClicked(!isClicked);
    }
  };



    return (
        <div className="w-full">
            <h1 className="font-sans font-semibold text-3xl mx-auto mb-2">Available coatings</h1>
            <p className="mb-10 text-be font-sans">You can select more than one.</p>

            <div
      onClick={handleClickOtherElement}
      className={`cursor-pointer hover:bg-gray-200 flex flex-row fixed-div mb-3 ${isClicked ? 'bg-gray-200' : 'bg-white'} border-2 border-gray-300 rounded-lg hover:border-gray-400`}
    >
      <div className="w-[25%] flex items-center">
        <img className="h-[65px] ml-8" src={superHydrophobic} alt="free silver package" />
      </div>
      <div class="w-[55%] p-4">
        <h2 class="text-xl font-bold mb-2">Clear</h2>
        <p class="text-base font-sans">Lenses for everyday use</p>
      </div>
      <div className="w-[20%] flex justify-center items-center">
        <input className="w-8 h-8 rounded-sm" type="checkbox" ref={checkboxRef} />
      </div>
    </div>


            <Link to="/order/review_selections">
            <button type="button"  class="mt-12 w-full block mx-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Continue</button>

            </Link>

        </div>
    )
}

// export default function SelectLensType() {
//     const [name, setName] = useState("JACKSON");
//     const [description, setDescription] = useState("Cat Eye Eyeglasses");
//     const [price, Price] = useState("$149.00");

//     return (

//         <SelectLensTypeScreen screenComponent={<SelectLensTypeComponentProp />} name={name} price={price} description={description} />

//     );
// }

