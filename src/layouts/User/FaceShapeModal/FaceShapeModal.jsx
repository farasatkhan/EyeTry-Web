import React, { useEffect, useRef, useState } from "react";

import Recommendation from "../../../pages/User/Recommendation";

import useWindowDimensions from "../../../utils/useWindowDimensions";

import { BsXLg } from "react-icons/bs";

const FaceShapeModal = ({ setShape, onChangeModal }) => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    let prevWidth = 0;
    let prevHeight = 0;
    const targetElement = document.getElementById("face_detect");

    if (!targetElement) {
      return;
    }

    const resizeObserver = new ResizeObserver((event) => {
      //   setWidth(event[0].contentBoxSize[0].inlineSize);
      //   setHeight(event[0].contentBoxSize[0].blockSize - 40);

      const newWidth = event[0].contentBoxSize[0].inlineSize;
      const newHeight = event[0].contentBoxSize[0].blockSize - 40;

      if (
        Math.abs(newWidth - prevWidth) >= 5 ||
        Math.abs(newHeight - prevHeight) >= 5
      ) {
        // Only update the state if the change is 10 pixels or more
        setWidth(newWidth);
        setHeight(newHeight);

        // Update the previous values
        prevWidth = newWidth;
        prevHeight = newHeight;
      }
    });

    resizeObserver.observe(targetElement);

    console.log("oberver ran");

    return () => {
      resizeObserver.unobserve(targetElement);
    };
  }, []);

  const [faceShape, setFaceShape] = useState("");

  const handleRecommendGlasses = () => {
    setShape(faceShape);
    onChangeModal();
  };

  return (
    <div className="fixed inset-0 shadow-sm bg-black bg-opacity-50 flex justify-center items-center">
      <div
        id="face_detect"
      >
        <div className="bg-white py-2 rounded-md mt-15">
        <div className="flex justify-between mx-5 my-4">
          <div className="">
            <p>
              {faceShape
                ? `Face Shape Detected: ${faceShape}`
                : "Face Detection"}
            </p>
          </div>
          <div className="cursor-pointer" onClick={onChangeModal}>
            <BsXLg size={25} />
          </div>
        </div>
        <div >
          {/* <div> */}
          <Recommendation
            modalWidth={600}
            modalHeight={400}
            setFaceShape={setFaceShape}
          />
        </div>
        <div className="mx-5 mb-4 mt-4">
          <div className="flex items-end justify-end gap-4">
            <button
              onClick={onChangeModal}
              className="text-white font-bold px-2 py-1 sm:py-2 sm:px-4 rounded border-2"
              style={{ zIndex: 1 }}
            >
              <p className="font-semibold text-sm text-black">Cancel</p>
            </button>
            {faceShape ? (
              <button
                onClick={handleRecommendGlasses}
                type="submit"
                className={`bg-blue-500 text-white font-bold px-2 py-1 sm:py-2 sm:px-4 rounded cursor-pointer`}
                style={{ zIndex: 1 }}
              >
                <p className="text-white text-sm font-light">
                  Recommend Glasses
                </p>
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className={`bg-blue-200 text-white font-bold px-2 py-1 sm:py-2 sm:px-4 rounded cursor-pointer`}
                style={{ zIndex: 1 }}
              >
                <p className="text-white text-sm font-semibold">
                  Recommend Glasses
                </p>
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FaceShapeModal;
