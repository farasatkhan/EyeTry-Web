import React, { useRef, useState, useEffect } from "react";

import { frameFinderPrediction } from "../../../services/FrameFinder/FrameFinder";

function FaceDetectionImages({ onFaceShapeChange }) {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await frameFinderPrediction(formData);

      if (response.status !== 200) {
        throw new Error("Failed to upload image!");
      }

      const faceShape = response.data.prediction;

      onFaceShapeChange(faceShape);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button onClick={handleButtonClick}>Upload an Image</button>
    </div>
  );
}

export default FaceDetectionImages;
