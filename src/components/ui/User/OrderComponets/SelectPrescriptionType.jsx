import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../../../redux/actions/orderSelectionAction';

export default function SelectLensTypeComponent({onNextStep , onSelectedOptions}) {

    const dispatch = useDispatch();

    const handleSelections = (type) => {
      // Dispatch an action to update the selectedOptions state in Redux
      dispatch(updateSelectedOptions({
        "lensProperties": {
        "prescriptionType":type
        }
      }));
    };
  
    const handleNext = () => {
      onNextStep();
    };

  return (
    <div>
      <h1 className="font-sans font-semibold text-2xl mx-auto mb-10 ">Select a prescription type</h1>

      <div onClick={ () => { handleSelections("Single Vision"); handleNext() }} className="cursor-pointer hover:border-gray-400 fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-md hover:bg-gray-200">
        <h2 className="text-lg font-bold mb-2">Single Vision</h2>
        <p className=" text-base font-sans">Most common prescription lenses, used for either distance or near vision</p>
      </div>

      <div onClick={ () => { handleSelections("Progressive"); handleNext() }} className="cursor-pointer hover:border-gray-400 fixed-div mb-3 bg-white border-gray-300 border-2 p-4 rounded-md hover:bg-gray-200">
        <h2 className="text-lg font-bold mb-2">Progressive</h2>
        <p className="text-base font-sans">No-line lenses with visual field options, including combinations of distance, intermediate, and near vision.</p>
      </div>

      <div onClick={ () => { handleSelections("Bifocal"); handleNext() }} className="cursor-pointer hover:border-gray-400 fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-md hover:bg-gray-200">
        <h2 className="text-lg font-bold mb-2">Bifocal</h2>
        <p className="text-base font-sans">Lenses with two fields of vision (distance and near) separated by a visible line.</p>
      </div>
    </div>
  )
}


