import React, { useRef, useState, useEffect } from "react";

import FaceShapeModal from "../../../layouts/User/FaceShapeModal";

function FaceDetection({ onFaceShapeChange }) {

  const [closeModal, setCloseModal] = useState(false);

  const changeModalHandle = () => {
    setCloseModal(!closeModal);
  };


  return (
    <div className="flex">
      <div>
        <button onClick={changeModalHandle}>Find Your Face Shape</button>
      </div>
      {closeModal && (
        <FaceShapeModal
          setShape={onFaceShapeChange}
          onChangeModal={changeModalHandle}
        />
      )}
    </div>
  );
}

export default FaceDetection;
