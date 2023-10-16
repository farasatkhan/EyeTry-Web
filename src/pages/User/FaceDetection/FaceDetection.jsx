import React, { useRef, useState, useEffect } from "react";

import FaceShapeModal from "../../../layouts/User/FaceShapeModal";

function FaceDetection({ onFaceShapeChange }) {
  const [faceShape, setFaceShape] = useState("")

  useEffect(() => {
    console.log(faceShape)
    if (faceShape == "") {
      onFaceShapeChange("All Shapes")
    } else {
      onFaceShapeChange(faceShape);
      console.log("face shaped sent to FilterShape from FaceDetection page: " + faceShape)
    }
  },[faceShape])

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
          setShape={setFaceShape}
          onChangeModal={changeModalHandle}
        />
      )}
    </div>
  );
}

export default FaceDetection;
