import React, { useState, useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import Image from '../../assets/images/visionAssessments/E.png';

const TumblingETest = () => {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [moves, setMoves] = useState([]);

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
    return results.filter(result => !result.isCorrect).length;
  };

  const getTestResultMessage = () => {
    const totalIncorrectResults = getTotalIncorrectResults();

    if (totalIncorrectResults === 0) {
        return "Your Eye Sight Is Perfect! :)"
    } else if (totalIncorrectResults == 1){
        return "I suggest that you retake the test to ensure that your eyesight is not weak.";
    }else if (totalIncorrectResults >= 2 && totalIncorrectResults < 4) {
      return "I suggest that you visit a doctor as it appears that you may be experiencing issues with your vision acuity.";
    } else if (totalIncorrectResults >= 4) {
      return "Your test results indicate a significant number of incorrect answers. It is strongly advised to consult with an eye care specialist immediately.";
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tumbling E Eye Test</h1>
      {currentMoveIndex !== -1 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Which direction is the E pointing?</h2>
          <div className="text-center mb-4">
            {getCurrentDirectionSymbol()}
          </div>
          <div className="flex justify-center space-x-4">
            <button
              className="p-2 bg-blue-500 text-white rounded"
              onClick={() => handleButtonClick('up')}
            >
              <span className="text-2xl">&uarr;</span>
            </button>
            <button
              className="p-2 bg-blue-500 text-white rounded"
              onClick={() => handleButtonClick('right')}
            >
              <span className="text-2xl">&rarr;</span>
            </button>
            <button
              className="p-2 bg-blue-500 text-white rounded"
              onClick={() => handleButtonClick('down')}
            >
              <span className="text-2xl">&darr;</span>
            </button>
            <button
              className="p-2 bg-blue-500 text-white rounded"
              onClick={() => handleButtonClick('left')}
            >
              <span className="text-2xl">&larr;</span>
            </button>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded">
              <div
                className="h-full bg-blue-500 rounded"
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
            <button
              className="mt-4 p-2 bg-blue-500 text-white rounded"
              onClick={retakeTest}
            >
              Retake Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TumblingETest;
