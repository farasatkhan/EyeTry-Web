import React, { useState } from "react";

export default function SelectLensTypeComponent({onNextStep}) {

  const handleNext = () => {
    onNextStep();
  }

  return (
    <div>
      <h1 className="font-sans font-semibold text-2xl mx-auto mb-10">Simplify your next purchase.</h1>
      <div onClick={() => handleNext()} class="cursor-pointer hover:border-gray-400 fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-md hover:bg-gray-200">
        <h2 class="text-lg font-bold mb-2">Save Prescription</h2>
        <p class=" text-base font-sans">Get the next pair in no time by saving this prescription to your profile.</p>
      </div>
      <div onClick={() => handleNext()} class="cursor-pointer hover:border-gray-400 fixed-div mb-3 bg-white border-2 p-4 rounded-md border-gray-300 hover:bg-gray-200">
        <h2 class="text-lg font-bold mb-2">Skip Saving Prescription</h2>
        <p class="text-base font-sans">Skip saving prescription this time.</p>
      </div>
    </div>
  )
}


