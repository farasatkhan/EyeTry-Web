import React from "react";
import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../../../redux/actions/orderSelectionAction';

export default function SelectGlassesType({ onNextStep }) {
  const dispatch = useDispatch();

  const handleGlassesTypeSelect = (type) => {
    // Dispatch an action to update the selectedOptions state in Redux
    dispatch(updateSelectedOptions({
      "lensProperties": {
        "lensType": type
      }
    }));
  };

  const handleNext = () => {
    onNextStep();
  };

  return (
    <>
      <h1 className="font-sans font-semibold text-2xl mx-auto mb-10">Select a prescription type</h1>
      <div onClick={() => { handleGlassesTypeSelect("Prescription"); handleNext(); }} className="cursor-pointer hover:border-gray-400 fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-md hover:bg-gray-200">
        <h2 className="text-lg font-bold mb-2">Prescription</h2>
        <p className="text-base font-sans">Lens with vision correction.</p>
      </div>
      <div onClick={() => { handleGlassesTypeSelect("Non-Prescription"); handleNext(); }} className="cursor-pointer hover:border-gray-400 fixed-div mb-3 bg-white border-gray-300 border-2 p-4 rounded-md hover:bg-gray-200">
        <h2 className="text-lg font-bold mb-2">Non-Prescription</h2>
        <p className="text-base font-sans">Lens with no vision correction.</p>
      </div>
      <div onClick={() => { handleGlassesTypeSelect("Readers"); handleNext(); }} className="cursor-pointer hover:border-gray-400 fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-md hover:bg-gray-200">
        <h2 className="text-lg font-bold mb-2">Readers</h2>
        <p className="text-base font-sans">One magnification field for reading. No prescription necessary.</p>
      </div>
    </>
  );
}
