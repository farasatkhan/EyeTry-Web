import React, { useState } from "react";
import '../../../components/ui/User/SelectLensTypeComponent/SelectLensTypeComponent.css';
import SelectLensTypeScreen from "../../../components/ui/User/SelectLensTypeComponent/SelectLensTypeComponent";


 function SelectLensTypeComponentProp() {
  return (
    <div className="">
      <h1 className="font-sans md:mt-0 font-semibold text-3xl mx-auto mb-10 mt-12">Choose prescription Option</h1>
      <div class="fixed-div mb-3 bg-white border-4 border-gray-300 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">New Customer or New Prescription?</h2>
        <p class=" text-base font-sans">You will need your current prescription and pupillary distance (PD).</p>
      </div>
      <div class="fixed-div mb-3 bg-white border-gray-300 border-4 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Select from my Account</h2>
        <p class="text-base font-sans">Choose a saved prescription or select one from a previous order.</p>
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

