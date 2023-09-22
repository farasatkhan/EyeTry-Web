import React, { useState, useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import Image from '../../../assets/images/visionAssessments/E.png';
import axios from 'axios'
import { reGenerateAccessToken } from '../../../api/authapi';
import bannerImg from '../../../assets/images/visionAssessments/acuitytest.jpg';


const TumblingETestScreen = () => {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [moves, setMoves] = useState([]);
  // const [status, setStatus] = useState(true);
  let status
  const baseURL = 'http://localhost:3000'
  


   const submitVisionAssessmentResult = async () => {
    const data = {
      testType: "Vision Acuity Test",
      status: status
    };
  
    try {
      const accessToken = await localStorage.getItem('accessToken');
      const response = await axios.post(`${baseURL}/users/submit_vision_assessment_result/`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      console.log('Response:', response);
      return response;
    } catch (error) {
      // Server is returning 403 for an expired token
      if (error.response && error.response.status === 403) {
        try {
          console.log('Error Caught');
          await reGenerateAccessToken();
          return submitVisionAssessmentResult();
        } catch (e) {
          console.error('Error while refreshing token', e);
          throw e;
        }
      }
      throw error;
    }
  };
  


  useEffect(() => {
    generateMoves();
  }, []);

  const generateMoves = () => {
    const directions = shuffleArray(['up', 'right', 'down', 'left']);
    const sizes = [100, 80, 60, 40, 20, 16, 12, 8, 6, 4];
    const shuffledMoves = [];
  
    for (let i = 0; i < 8; i++) {
      const direction = directions[i % 4];
      const size = sizes[i];
      shuffledMoves.push({ direction, size });
    }
  
    setMoves(shuffledMoves);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleButtonClick = (selectedDirection) => {
    const currentMove = moves[currentMoveIndex];
    const isCorrect = selectedDirection === currentMove.direction;
    const result = { direction: currentMove.direction, isCorrect };
    setResults([...results, result]);

    if (currentMoveIndex < moves.length - 1) {
      setCurrentMoveIndex(currentMoveIndex + 1);
    } else {
      // Test completed
      setCurrentMoveIndex(-1); // Set to -1 to show results
    }
  };

  const getCurrentDirectionSymbol = () => {
    const currentMove = moves[currentMoveIndex];
    if (!currentMove) {
      return null;
    }
    const { direction, size } = currentMove;
    const arrowSize = size / 2; // Reduce the size by 2
  
    const rotationStyle = {
      transform: `rotate(${getRotationValue(direction)}deg)`,
      width: `${arrowSize}px`, // Use width property instead of fontSize
      height: `${arrowSize}px`, // Use height property instead of fontSize
      margin: '0 auto',
    };
  
    return <img src={Image} alt="Direction" style={rotationStyle} />;
  };

  const getRotationValue = (direction) => {
    switch (direction) {
      case 'right':
        return 0;
      case 'down':
        return 90;
      case 'left':
        return 180;
      case 'up':
        return 270;
      default:
        return 0;
    }
  };

  const renderResults = () => {
    return results.map((result, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{result.isCorrect ? <AiOutlineCheckCircle className="h-5 w-5 text-green-500" /> : <AiOutlineCloseCircle className="h-5 w-5 text-red-500" />}</td>
        <td>{result.isCorrect ? 'Correct' : 'Incorrect'}</td>
      </tr>
    ));
  };

  const getTotalIncorrectResults = () => {
    const incorrectNumbers = results.filter(result => !result.isCorrect).length;
    incorrectNumbers == 0 ? status = true : status = false; 
    return incorrectNumbers;
  };

  const getTestResultMessage = () => {
    const totalIncorrectResults = getTotalIncorrectResults();
  
    if (totalIncorrectResults === 0) {
      return <span style={{ color: 'green' }}>Congrats! Your Eye Sight Is Perfect :)</span>;
    } else if (totalIncorrectResults === 1) {
      return <span style={{ color: '#E49B0F' }}>Yout have passed the test but I suggest that you retake the test to ensure that your eyesight is not weak.</span>;
    } else if (totalIncorrectResults >= 2 && totalIncorrectResults < 4) {
      return <span style={{ color: '#E49B0F' }}>I suggest that you visit a doctor as it appears that you may be experiencing issues with your vision acuity.</span>;
    } else if (totalIncorrectResults >= 4) {
      return <span style={{ color: 'red' }}>Your test results indicate a significant number of incorrect answers. It is strongly advised to consult with an eye care specialist immediately.</span>;
    }
  
    return null;
  };

  const retakeTest = () => {
    generateMoves();
    setResults([]);
    setCurrentMoveIndex(0);
  };

  const progressPercentage = (currentMoveIndex / (moves.length - 1)) * 100;

  return (
    <div className="flex flex-col min-h-screen">
    <div className="flex flex-col items-center">
      <h3 className="text-2xl sm:text-4xl font-bold font-sans text-[#374151] mt-10 ">Visual Acuity Testing (Snellen Chart)</h3>
      <p className="font-sans text-base mt-2 mb-8">Find out if you're color blind in less than 2 minutes!</p>
      <div className="flex justify-center w-full">
        <img className="w-full" src={bannerImg} alt="Color Blind Test" />
      </div>
    </div>
    <div className="p-5 mt-10 bg-white border border-gray-200 rounded-lg shadow w-[90%] mx-auto mb-5">

    <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10 ">
    <h3 className="text-2xl sm:text-4xl font-bold font-sans text-[#374151] mt-10">Take Test Now</h3>
    <p className='mt-10 text-justify font-sans'>Test your visual acuity from the comfort of your couch or office chair with our online eye test. This test could help give you an indication of whether if you suffer from myopia (short-sightedness), hyperopia (farsightedness) or other eyesight problems that may require corrective glasses or lenses.

Before you start the online eye test, please remove any prescription glasses or lenses. As eyesight can change over time, performing the test without these aids will give you an indication of the accuracy of your current prescription.</p>
    <p className='mt-5 font-semibold mb-10'>Note: this test is based off the standard Snellen Chart test</p>
    <div className="container mx-auto p-4 ">
      <h1 className="text-3xl font-bold mb-4">Tumbling E Eye Test</h1>
      {currentMoveIndex !== -1 ? (
        <div className=''>
          <h2 className="text-2xl font-bold mb-4 mx-auto">Which direction is the E pointing?</h2>
          <div className='w-[200px] h-[120px] mx-auto mt-16'>          
             <div className="text-center mb-4 mx-auto ">
            {getCurrentDirectionSymbol()}
          </div>
          </div>

          <div className="flex justify-center space-x-4 mb-10">
            <button
              className="p-2 w-24 bg-red-700 text-white rounded"
              onClick={() => handleButtonClick('up')}
            >
              <span className="text-2xl">&uarr;</span>
            </button>
            <button
              className="p-2 w-24 bg-red-700 text-white rounded"
              onClick={() => handleButtonClick('right')}
            >
              <span className="text-2xl">&rarr;</span>
            </button>
            <button
              className="p-2 w-24 bg-red-700 text-white rounded"
              onClick={() => handleButtonClick('down')}
            >
              <span className="text-2xl">&darr;</span>
            </button>
            <button
              className="p-2 w-24 bg-red-700 text-white rounded"
              onClick={() => handleButtonClick('left')}
            >
              <span className="text-2xl">&larr;</span>
            </button>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded">
              <div
                className="h-full bg-[#374151] rounded"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Test Results</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 text-left">Move</th>
                <th className="py-2 px-4 text-left">Result</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renderResults()}
            </tbody>
          </table>
          <div className="mt-4">
            <p className="text-lg font-bold">
              {getTestResultMessage()}
            </p>
            <div className='flex space-x-4 mt-10'>
            <button
              className="px-4 py-2 bg-red-700 text-white rounded"
              onClick={retakeTest}
            >
              Retake Test
            </button>
            
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded"
              onClick={submitVisionAssessmentResult}
            >
              Save Results
            </button>
              </div>

          </div>
        </div>
      )}
    </div>


  </div>
</div>
</div>
  );
};


export default TumblingETestScreen;