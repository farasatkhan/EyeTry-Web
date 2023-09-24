import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import superHydrophobic from '/superHydrophobic.svg'
import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../../../redux/actions/orderSelectionAction';

export default function SelectLensTypeComponent({onNextStep, onSelectedOptions}) {
  
  const handleNext = (step) => {
    onNextStep(step);
  }

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

  // handling data and sending to parent component
  const dispatch = useDispatch();

  const handleSelectedOptions = (upgrades) => {
    // Dispatch an action to update selected package and coatings
    dispatch(updateSelectedOptions({
      "lensProperties": {
        "upgrades": upgrades
      }
    }));
  };


  return (
    <div className="w-full">
      <h1 className="font-sans font-semibold text-2xl mx-auto mb-2">Available coatings</h1>
      <p className="mb-10 text-be font-sans">You can select more than one.</p>

      <div
        onClick={() => {
          handleClickOtherElement();
          handleSelectedOptions("Super Hydrophobic")
        }}
        className={`cursor-pointer hover:bg-gray-200 flex hover:border-gray-400 flex-row fixed-div mb-3 ${isClicked ? 'bg-gray-200' : 'bg-white'} border-2 border-gray-300 rounded-md hover:border-gray-400`}
      >
        <div className="w-[25%] flex items-center">
          <img className="h-[65px] ml-8" src={superHydrophobic} alt="free silver package" />
        </div>
        <div class="w-[55%] p-4">
          <h2 class="text-lg font-bold mb-2">Super Hydrophobic</h2>
          <p class="text-base font-sans">Easy to clean. Keep water, fingerprints and debris away from your lenses.</p>
        </div>
        <div className="w-[20%] flex justify-center items-center">
          <input className="w-8 h-8 rounded-sm" type="checkbox" ref={checkboxRef} />
        </div>
      </div>
      <button onClick={() => handleNext(11)} type="button" class="mt-12 w-full block mx-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5  mb-2">Continue</button>



    </div>
  )
}

