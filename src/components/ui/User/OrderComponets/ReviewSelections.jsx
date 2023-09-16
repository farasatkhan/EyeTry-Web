import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import superHydrophobic from '/superHydrophobic.svg'

export default function SelectLensTypeComponentProp({ selectedOptions, onConfirmSelection }) {
    // Create a ref for the checkbox
    const checkboxRef = useRef(null);

    // Function to programmatically click the checkbox
    const handleClickOtherElement = () => {
        if (checkboxRef.current) {
            checkboxRef.current.click();
        }
    };

    return (
        <div className="w-full">
            <h1 className="font-sans font-semibold text-3xl mx-auto mb-2">Review Your Selections</h1>
            <p className="mb-10 text-base font-sans">You can select more than one.</p>

            {/* <div onClick={handleClickOtherElement} className="cursor-pointer hover:bg-gray-200 flex flex-row fixed-div mb-3 bg-white border-4 border-gray-300 rounded-lg hover:border-gray-300">
                <div className="w-[25%] flex items-center ">
                    <img className="h-[65px] ml-8" src={superHydrophobic} alt="free silver package" />
                </div>
                <div class="w-[55%] p-4">
                    <h2 class="text-xl font-bold mb-2">Clear</h2>
                    <p class=" text-base font-sans">Lenses for eveyday use</p>
                </div>
                <div className="w-[20%] flex justify-center items-center">
                    <p className="font-sans font-bold underline">Edit</p>
                </div>
            </div> */}
    <div>
      <h1>Review Your Selections</h1>
      {/* Display selected options here */}
      <pre>{JSON.stringify(selectedOptions, null, 2)}</pre>
      <button onClick={onConfirmSelection}>Confirm Selections</button>
    </div>


            <button type="button" class="mt-12 w-[90%] block mx-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Continue</button>

        </div>
    )
}


