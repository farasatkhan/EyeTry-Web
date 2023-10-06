import React, { useRef, useState } from "react";
import "@tensorflow/tfjs";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh";
import Webcam from "react-webcam";
import { runDetector } from "../../../utils/detector";

const inputResolution = {
  width: 500,
  height: 500,
};

const videoConstraints = {
  width: inputResolution.width,
  height: inputResolution.height,
  facingMode: "user",
};

function FaceDetection() {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const handleVideoLoad = (videoNode) => {
    const video = videoNode.target;
    if (video.readyState !== 4) return;
    if (loaded) return;
    runDetector(video, canvasRef.current, setFaceShapeText);
    setLoaded(true);
  };
  const [faceShapeText, setFaceShapeText] = useState("");
  return (
    <div className="flex">
      <div className="">
        <Webcam
          width={inputResolution.width}
          height={inputResolution.height}
          style={{ visibility: "hidden", position: "absolute" }}
          videoConstraints={videoConstraints}
          onLoadedData={handleVideoLoad}
        />
        <canvas
          ref={canvasRef}
          width={inputResolution.width}
          height={inputResolution.height}
          style={{ position: "absolute" }}
        />
        {loaded ? <></> : <header>Loading...</header>}
      </div>
      <div className="">
        <span className="text-2xl">{faceShapeText}</span>
      </div>
    </div>
  );
}

export default FaceDetection;
