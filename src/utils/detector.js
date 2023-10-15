import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./drawMesh";

export const runDetector = async (video, canvas, setFaceShape, setLoaded) => {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detectorConfig = {
    runtime: "tfjs",
  };
  const detector = await faceLandmarksDetection.createDetector(
    model,
    detectorConfig
  );

  const detect = async (net) => {
    const estimationConfig = { flipHorizontal: false };
    try {
      const faces = await net.estimateFaces(video, estimationConfig);
      const ctx = canvas.getContext("2d");
      if (faces.length > 0) {
        const faceShape = determineFaceShape(faces[0].keypoints, faceLandmarks);
        setFaceShape(faceShape);
      }
      requestAnimationFrame(() => drawMesh(faces[0], ctx));
      detect(detector);
      
    } catch (error) {
      setLoaded(false);
      console.log("Custom Error from tensorflow: ", error);
    }
  };
  detect(detector);
};

const determineFaceShape = (faceKeypoints, faceLandmarks) => {
  // Face width: Distance between the right and left cheek landmarks (93 and 323)
  const faceWidth = distanceBetweenLandmarks(faceKeypoints, faceLandmarks.silhouette, 27, 9);
  // Face height: Distance between the top of the forehead and the bottom of the chin (10 and 152).
  const faceHeight = distanceBetweenLandmarks(faceKeypoints, faceLandmarks.silhouette, 0, 18);
  // Forehead width: Distance between the two eyebrow inner corners (55 and 285).
  // const foreheadWidth = distanceBetweenEyebrowsLandmarks(faceKeypoints, faceLandmarks.leftEyebrowUpper, faceLandmarks.rightEyebrowUpper, 6, 6);
  // Forehead width: Distance between the two eyebrow inner corners 332 and 103.
  const foreheadWidth = distanceBetweenLandmarks(faceKeypoints, faceLandmarks.silhouette, 3, 33);
  // Jawline width: Distance between the two jawline corners (58 and 288). or use  which is little lower [172, 397]
  const jawlineWidth = distanceBetweenLandmarks(faceKeypoints, faceLandmarks.silhouette, 25, 11);

  // console.log(faceHeight / faceWidth);
  // console.log(foreheadWidth / jawlineWidth);

  if (faceHeight / faceWidth >= 0.8 && foreheadWidth / jawlineWidth >= 0.8) {
    return "Round"
  } else if (faceHeight / faceWidth >= 1 && foreheadWidth / jawlineWidth >= 0.9) {
    return "Oval"
  } else if (faceHeight / faceWidth >= 1 && foreheadWidth / jawlineWidth <= 0.9) {
    return "Diamond"
  } else if (faceHeight / faceWidth >= 1 && foreheadWidth / jawlineWidth <= 0.7) {
    return "Triangle"
  } else if (faceHeight / faceWidth >= 0.9 && foreheadWidth / jawlineWidth >= 0.9 && faceHeight / faceWidth <= 1) {
    return "Square"
  } else {
    return false;
  }
};

function distanceBetweenLandmarks(faceKeypoints, landmarks, landmark1Index, landmark2Index) {
  const landmark1 = landmarks[landmark1Index];
  const landmark2 = landmarks[landmark2Index];

  const faceLandmarks1 = faceKeypoints[landmark1];
  const faceLandmarks2 = faceKeypoints[landmark2];

  const distance = Math.sqrt(
    Math.pow(faceLandmarks1.x - faceLandmarks2.x, 2) +
      Math.pow(faceLandmarks1.y - faceLandmarks2.y, 2)
  );

  return distance;
}

function distanceBetweenEyebrowsLandmarks(faceKeypoints, leftEyebrow, rightEyebrow, landmark1Index, landmark2Index) {
  const landmark1 = leftEyebrow[landmark1Index];
  const landmark2 = rightEyebrow[landmark2Index];

  const EyebrowLandmarks1 = faceKeypoints[landmark1];
  const EyebrowLandmarks2 = faceKeypoints[landmark2];

  const distance = Math.sqrt(
    Math.pow(EyebrowLandmarks1.x - EyebrowLandmarks2.x, 2) +
      Math.pow(EyebrowLandmarks1.y - EyebrowLandmarks2.y, 2)
  );

  return distance;
}


const faceLandmarks = {
  silhouette: [
    10,  338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
    397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
    172, 58,  132, 93,  234, 127, 162, 21,  54,  103, 67,  109
  ],

  lipsUpperOuter: [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291],
  lipsLowerOuter: [146, 91, 181, 84, 17, 314, 405, 321, 375, 291],
  lipsUpperInner: [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308],
  lipsLowerInner: [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308],

  rightEyeUpper0: [246, 161, 160, 159, 158, 157, 173],
  rightEyeLower0: [33, 7, 163, 144, 145, 153, 154, 155, 133],
  rightEyeUpper1: [247, 30, 29, 27, 28, 56, 190],
  rightEyeLower1: [130, 25, 110, 24, 23, 22, 26, 112, 243],
  rightEyeUpper2: [113, 225, 224, 223, 222, 221, 189],
  rightEyeLower2: [226, 31, 228, 229, 230, 231, 232, 233, 244],
  rightEyeLower3: [143, 111, 117, 118, 119, 120, 121, 128, 245],

  rightEyebrowUpper: [156, 70, 63, 105, 66, 107, 55, 193],
  rightEyebrowLower: [35, 124, 46, 53, 52, 65],

  rightEyeIris: [473, 474, 475, 476, 477],

  leftEyeUpper0: [466, 388, 387, 386, 385, 384, 398],
  leftEyeLower0: [263, 249, 390, 373, 374, 380, 381, 382, 362],
  leftEyeUpper1: [467, 260, 259, 257, 258, 286, 414],
  leftEyeLower1: [359, 255, 339, 254, 253, 252, 256, 341, 463],
  leftEyeUpper2: [342, 445, 444, 443, 442, 441, 413],
  leftEyeLower2: [446, 261, 448, 449, 450, 451, 452, 453, 464],
  leftEyeLower3: [372, 340, 346, 347, 348, 349, 350, 357, 465],

  leftEyebrowUpper: [383, 300, 293, 334, 296, 336, 285, 417],
  leftEyebrowLower: [265, 353, 276, 283, 282, 295],

  leftEyeIris: [468, 469, 470, 471, 472],

  midwayBetweenEyes: [168],

  noseTip: [1],
  noseBottom: [2],
  noseRightCorner: [98],
  noseLeftCorner: [327],

  rightCheek: [205],
  leftCheek: [425]
};