import React, { useRef, useState } from "react";

import FaceShapeModal from "../../../layouts/User/FaceShapeModal";

function FaceDetection({ setFaceShape }) {
  const [closeModal, setCloseModal] = useState(false);

  const changeModalHandle = () => {
    setCloseModal(!closeModal);
  };

  return (
    <div className="flex">
      <div>
        <button onClick={changeModalHandle}>Open Modal</button>
      </div>
      {closeModal && (
        <FaceShapeModal
          setShape={setFaceShape}
          onChangeModal={changeModalHandle}
        />
      )}
    </div>
  );
}

export default FaceDetection;
