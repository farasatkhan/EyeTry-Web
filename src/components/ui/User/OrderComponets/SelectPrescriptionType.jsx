import React, { useState } from "react";
// import '../../../components/ui/User/SelectLensTypeComponent/SelectLensTypeComponent.css';
// import SelectLensTypeScreen from "../SelectLensTypeComponent/SelectLensTypeComponent";
import { Link } from "react-router-dom";

export default function SelectLensTypeComponentProp() {
  return (
    <div>
      <h1 className="font-sans md:mt-0 font-semibold text-3xl mx-auto mb-10 mt-12">Select a prescription type</h1>
      <Link to="/order/enter_prescription">
      <div class="fixed-div mb-3 bg-white border-4 border-gray-300 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Single Vision</h2>
        <p class=" text-base font-sans">Most common prescription lenses, used for either distance or near vision</p>
      </div>
      </Link>

      <Link to="/order/enter_prescription">
      <div class="fixed-div mb-3 bg-white border-gray-300 border-4 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Progressive</h2>
        <p class="text-base font-sans">No-line lenses with visual field options, including combinations of distance, intermediate, and near vision.</p>
      </div>
      </Link>

      <Link to="/order/enter_prescription">
      <div class="fixed-div mb-3 bg-white border-4 border-gray-300 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Bifocal</h2>
        <p class="text-base font-sans">Lenses with two fields of vision (distance and near) separated by a visible line.</p>
      </div>
      </Link>

    </div>
  )
}

// export default function SelectLensType() {
//   const [name, setName] = useState("JACKSON");
//   const [description, setDescription] = useState("Cat Eye Eyeglasses");
//   const [price, Price] = useState("$149.00");

//   return (

//     <SelectLensTypeScreen screenComponent={<SelectLensTypeComponentProp/>} name={name} price={price} description={description} />

//   );
// }

