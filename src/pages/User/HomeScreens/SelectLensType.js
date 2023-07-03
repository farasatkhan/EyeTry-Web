import React, { useState } from "react";
import '../../../components/ui/User/SelectLensTypeComponent/SelectLensTypeComponent.css';
import SelectLensTypeScreen from "../../../components/ui/User/SelectLensTypeComponent/SelectLensTypeComponent";


export function SelectLensTypeComponentProp() {
  return (
    <div>
      <h1 className="font-sans md:mt-0 font-semibold text-3xl mx-auto mb-10 mt-12">Select a prescription type</h1>
      <div class="fixed-div mb-3 bg-white border-4 border-gray-300 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Prescription</h2>
        <p class=" text-base font-sans">Lens with vision correction.</p>
      </div>
      <div class="fixed-div mb-3 bg-white border-gray-300 border-4 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Non-Prescription</h2>
        <p class="text-base font-sans">Lens with no vision correction.</p>
      </div>
      <div class="fixed-div mb-3 bg-white border-4 border-gray-300 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Readers</h2>
        <p class="text-base font-sans">One magnification field for reading. No prescription necessary.</p>
      </div>
    </div>
  )
}

export default function SelectLensType() {
  const [name, setName] = useState("JACKSON");
  const [description, setDescription] = useState("Cat Eye Eyeglasses");
  const [price, Price] = useState("$149.00");

  return (

    <SelectLensTypeScreen screenComponent={<SelectLensTypeComponentProp/>} name={name} price={price} description={description} />

  );
}

