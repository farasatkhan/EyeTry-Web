import React, { useState } from "react";

export default function SelectLensTypeComponent({onNextStep}) {

  const handleNext = () => {
    onNextStep();
  }

  return (
    <div >
      <h1 className="font-sans font-semibold text-gray-800 text-3xl mx-auto mb-10 ">Choose prescription Option</h1>
      <div onClick={() => handleNext()} class="cursor-pointer fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">New Customer or New Prescription?</h2>
        <p class=" text-base font-sans">You will need your current prescription and pupillary distance (PD).</p>
      </div>
      <div onClick={() => handleNext()} class="cursor-pointer fixed-div mb-3 bg-white border-gray-300 border-2 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Select from my Account</h2>
        <p class="text-base font-sans">Choose a saved prescription or select one from a previous order.</p>
      </div>
    </div>
  )
}


