import React, { useState, useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import axios from 'axios'
import { reGenerateAccessToken } from '../../../api/authapi';

// importing images
import bannerImg from '../../../assets/images/visionAssessments/colorblind.webp'
import Image1 from '../../../assets/images/visionAssessments/colorblind-test-image1.webp';
import Image2 from '../../../assets/images/visionAssessments/colorblind-test-image2.webp';
import Image3 from '../../../assets/images/visionAssessments/colorblind-test-image3.webp';
import Image4 from '../../../assets/images/visionAssessments/colorblind-test-image4.webp';
import Image5 from '../../../assets/images/visionAssessments/colorblind-test-image5.webp';
import Image6 from '../../../assets/images/visionAssessments/colorblind-test-image6.webp';
import Image7 from '../../../assets/images/visionAssessments/colorblind-test-image7.webp';
import Image8 from '../../../assets/images/visionAssessments/colorblind-test-image8.webp';
import Image9 from '../../../assets/images/visionAssessments/colorblind-test-image9.webp';
import Image10 from '../../../assets/images/visionAssessments/colorblind-test-image10.webp';
import Image11 from '../../../assets/images/visionAssessments/colorblind-test-image11.webp';
import Image12 from '../../../assets/images/visionAssessments/colorblind-test-image12.webp';


const ColorBlindnessTestScreen = () => {

  let status;
  const baseURL = 'http://localhost:3000'
  

   const submitVisionAssessmentResult = async () => {
    const data = {
      testType: "Color Blind Test",
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

  const [images, setImages] = useState([
    { id: 1, src: Image1, number: 7 },
    { id: 2, src: Image2, number: 6 },
    { id: 3, src: Image3, number: 26 },
    { id: 4, src: Image4, number: 15 },
    { id: 5, src: Image5, number: 6 },
    { id: 6, src: Image6, number: 73 },
    { id: 7, src: Image7, number: 5 },
    { id: 8, src: Image8, number: 16 },
    { id: 9, src: Image9, number: 45 },
    { id: 10, src: Image10, number: 12 },
    { id: 11, src: Image11, number: 29 },
    { id: 12, src: Image12, number: 8 },
    // Add more images as needed
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    shuffleImages();
  }, []);

  useEffect(() => {
    setUserInput('');
  }, [currentImageIndex]);

  const shuffleImages = () => {
    const shuffledImages = [...images].sort(() => Math.random() - 0.5);
    setImages(shuffledImages);
  };

  const handleNext = () => {
    if (currentImageIndex === images.length - 1) {
      setShowResults(true);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleNumberButtonClick = (number) => {
    setUserInput((prevInput) => prevInput + number.toString());
  };

  const handleSubmit = () => {
    const currentImage = images[currentImageIndex];
    const isCorrect = parseInt(userInput, 10) === currentImage.number;
    setResults((prevResults) => [
      ...prevResults,
      { imageId: currentImage.id, isCorrect },
    ]);
    handleNext();
  };

  const renderImage = () => {
    const currentImage = images[currentImageIndex];
    const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
      <button key={number} onClick={() => handleNumberButtonClick(number)}>
        {number}
      </button>
    ));


    return (
      <div className='flex flex-row space-x-10'>
        <div>
          <img className=' object-cover' width={280} height={280} src={currentImage.src} alt={`Image ${currentImage.id}`} />

        </div>

        <div className='flex items-center justify-center'>
          <div className="screen-box ">
            <p>What number do you see in the image?</p>
            {/* <p className="user-input">{userInput}</p> */}
            <input className='block w-[92%] mx-auto pl-10 pr-3 borderblock px-4  py-2.5 mt-2  bg-white border rounded-md
                            border-blue-300 ring-blue-300 outline-none ring ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Enter prescription name" type="text' type="text" value={userInput} disabled />

            {/* <div className="number-buttons">{numberButtons}</div> */}
            <div className="flex flex-wrap max-w-xs  p-2  ">
              <button key={1} onClick={() => handleNumberButtonClick(1)} className="w-1/3 px-4 p-2 bg-[#374151] border-4 border-white rounded-lg text-white">1</button>
              <button key={2} onClick={() => handleNumberButtonClick(2)} className="w-1/3 px-4 p-2 bg-[#374151] border-4 border-white rounded-lg text-white">2</button>
              <button key={3} onClick={() => handleNumberButtonClick(3)} className="w-1/3 px-4 p-2 bg-[#374151] border-4 border-white rounded-lg text-white">3</button>
              <button key={4} onClick={() => handleNumberButtonClick(4)} className="w-1/3 px-4 p-2 bg-[#374151] border-4 border-white rounded-lg text-white">4</button>
              <button key={5} onClick={() => handleNumberButtonClick(5)} className="w-1/3 px-4 p-2 bg-[#374151] border-4 border-white rounded-lg text-white">5</button>
              <button key={6} onClick={() => handleNumberButtonClick(6)} className="w-1/3 px-4 p-2 bg-[#374151] border-4 border-white rounded-lg text-white">6</button>
              <button key={7} onClick={() => handleNumberButtonClick(7)} className="w-1/3 px-4 p-2 bg-[#374151] border-4 border-white rounded-lg text-white">7</button>
              <button key={8} onClick={() => handleNumberButtonClick(8)} className="w-1/3 px-4 p-2 bg-[#374151] border-4 border-white rounded-lg text-white">8</button>
              <button key={9} onClick={() => handleNumberButtonClick(9)} className="w-1/3 px-4 p-2 bg-[#374151] border-4 border-white rounded-lg text-white">9</button>
              <button onClick={handleSubmit} className='w-full text-center bg-red-700 text-white py-2.5 border-4 border-white rounded-lg' >Submit</button>
            </div>
          </div>

        </div>

      </div>
    );
  };

  const renderProgressBar = () => {
    const progress = ((currentImageIndex + 1) / images.length) * 100;
    return (
      <div>
        <p className='text-base font-sans mt-10'>Test Progress</p>
        <div style={{ width: '100%', background: '#ccc', borderRadius: 10 }}>
          <div
            style={{ width: `${progress}%`, background: '#374151', height: '12px', borderRadius: 10 }}
          />
        </div>
      </div>

    );
  };

  const getTotalIncorrectResults = () => {
        const incorrectNumbers = results.filter(result => !result.isCorrect).length;

    incorrectNumbers == 0 ? status = true : status = false 
    return incorrectNumbers;
  };

  const getTestResultMessage = () => {
    const totalIncorrectResults = getTotalIncorrectResults();
  
    if (totalIncorrectResults === 0) {
      return <span style={{ color: 'green' }}>Test Passed: Congrats! Your Eye Sight Is Perfect :)</span>;
    } else if (totalIncorrectResults === 1) {
      return <span style={{ color: '#E49B0F' }}>Test Passed: Yout have passed the test but I suggest that you retake the test to ensure that your eyesight is not weak.</span>;
    } else if (totalIncorrectResults >= 2 && totalIncorrectResults < 4) {
      return <span style={{ color: '#E49B0F' }}>Test Failed: I suggest that you visit a doctor as it appears that you may be experiencing issues with your vision acuity.</span>;
    } else if (totalIncorrectResults >= 4) {
      return <span style={{ color: 'red' }}>Test Failed: Your test results indicate a significant number of incorrect answers. It is strongly advised to consult with an eye care specialist immediately.</span>;
    }
  
    return null;
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

  const DisplayResults = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold">Test Results</h2>
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
        <p className="text-lg font-bold mt-5">
          {getTestResultMessage()}
        </p>
      </div>
    );
  };


  const handleRetakeTest = () => {
    shuffleImages();
    setCurrentImageIndex(0);
    setUserInput('');
    setResults([]);
    setShowResults(false);
  };
  const renderRetakeButton = () => {
    return (
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={handleRetakeTest}
          className="px-4 py-2 bg-red-700 text-white rounded"
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
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center">
        <h3 className="text-2xl sm:text-4xl font-bold font-sans text-[#374151] mt-10 ">Color Blind Test</h3>
        <p className="font-sans text-base mt-2 mb-8">Find out if you're color blind in less than 2 minutes!</p>
        <div className="flex justify-center">
          <img src={bannerImg} alt="Color Blind Test" />
        </div>
      </div>

      <div className="p-5 mt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">


        <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10 ">
          <h3 className="text-2xl sm:text-4xl font-bold font-sans text-[#374151] mt-10">Take Test Now</h3>
          <p className='mt-10 text-justify font-sans'>Color Blind Test info: This fairly common condition often goes undiagnosed, because
            you do not realize you aren’t seeing colors as other people do. Yet testing for color
            blindness is simple — doesn’t even require a trip to the doctor.
            Simply look at the symbols below and enter the numbers that you can see. You’ll get an
            instant result that will help you if you are struggling with color blindness, and which
            colors are more problematic.</p>
          <p className='mt-5 font-semibold mb-10'>Note: this is test is based off the standard Ishihara color plate test</p>

          <div className='flex justify-center'>
            {showResults ? (
              <div>
                {DisplayResults()}
                {renderRetakeButton()}
              </div>
            ) : (
              <div className='mb-20'>
                {renderImage()}
                {renderProgressBar()}
              </div>
            )}
          </div>

          {/* <div className="w-full flex items-center justify-center">
            <div className="md:ml-auto md:text-right text-center mt-16 mb-10">
              <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
              <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Account</button>
            </div>
          </div> */}

        </div>

      </div>
    </div>
  );
};

export default ColorBlindnessTestScreen;