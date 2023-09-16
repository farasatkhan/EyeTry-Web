import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function SelectGlassesType({ onSelectedOptions, onNextStep }) {
  const handleGlassesTypeSelect = (type) => {
    // Update the selectedOptions state
    onSelectedOptions(type);
  };

  // for navigation
  const handleNext = () => {
    // Call the parent's handleNextStep function when the element is clicked
    onNextStep();
  };
  
  return (
    <>
      <h1 className="font-sans  font-semibold text-3xl mx-auto mb-10">Select a prescription type</h1>
      <div onClick={ () => {handleGlassesTypeSelect("Prescription"); handleNext() }} class="cursor-pointer fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Prescription</h2>
        <p class=" text-base font-sans">Lens with vision correction.</p>
      </div>
      <div onClick={() => {handleGlassesTypeSelect("Non-Prescription"); handleNext()}} class="cursor-pointer fixed-div mb-3 bg-white border-gray-300 border-2 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Non-Prescription</h2>
        <p class="text-base font-sans">Lens with no vision correction.</p>
      </div>
      <div onClick={() => {handleGlassesTypeSelect("Readers"); handleNext()}} class="cursor-pointer fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Readers</h2>
        <p class="text-base font-sans">One magnification field for reading. No prescription necessary.</p>
      </div>
    </>
  )
}


