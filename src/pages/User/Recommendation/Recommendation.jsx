import React, { useEffect, useRef, useState } from "react";
import "@tensorflow/tfjs";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/face_mesh";
import Webcam from "react-webcam";
import { runDetector } from "../../../utils/detector";

function Recommendation({ modalWidth, modalHeight, setFaceShape }) {
  const canvasRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const handleVideoLoad = (videoNode) => {
    const video = videoNode.target;
    if (video.readyState !== 4) return;
    if (loaded) return;
    runDetector(video, canvasRef.current, setFaceShape, setLoaded);
    setLoaded(true);
  };

  // const videoRef = useRef(null);

  // useEffect(() => {
  //   console.log("useeffect ref:", videoRef);
  //   handleVideoLoad(videoRef.current);
  // }, [modalWidth, modalHeight]);

  //   console.log(modalWidth);
  //   console.log(modalHeight);

  //   const inputResolution = {
  //     width: 600,
  //     height: 380,
  //   };

  const inputResolution = {
    width: modalWidth,
    height: modalHeight,
  };

  const videoConstraints = {
    width: inputResolution.width,
    height: inputResolution.height,
    facingMode: "user",
  };

  return (
    <div className="relative">
      <Webcam
        width={inputResolution.width}
        height={inputResolution.height}
        style={{
          position: "absolute",
        }}
        videoConstraints={videoConstraints}
        onLoadedData={handleVideoLoad}
        onResize={handleVideoLoad}
      />
      <canvas
        ref={canvasRef}
        width={inputResolution.width}
        height={inputResolution.height}
        style={{
          position: "absolute",
        }}
      />
      {loaded ? <></> : <header>Loading...</header>}
    </div>
  );
}

export default Recommendation;
