import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SelectLensTypeComponentProp() {
  return (
    <div>
      <h1 className="font-sans font-semibold text-3xl mx-auto mb-10">Simplify your next purchase.</h1>
      <Link to="/order/choose_lens_package">
      <div class="fixed-div mb-3 bg-white border-2 border-gray-300 p-4 rounded-lg hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Save Prescription</h2>
        <p class=" text-base font-sans">Get the next pair in no time by saving this prescription to your profile.</p>
      </div>
      </Link>
      <Link to="/order/choose_lens_package">
      <div class="fixed-div mb-3 bg-white border-2 p-4 rounded-lg border-gray-300 hover:bg-gray-200">
        <h2 class="text-xl font-bold mb-2">Skip Prescription</h2>
        <p class="text-base font-sans">Skip saving prescription this time.</p>
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

//     <SelectLensTypeScreenComponent screenComponent={<SelectLensTypeComponentProp/>} name={name} price={price} description={description} />

//   );
// }

