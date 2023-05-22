import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/ui/UserProfilingSidebar";

// importing images
import Image1 from '../../visionAssessments/colorblind-test-image1.webp';
import Image2 from '../../visionAssessments/colorblind-test-image2.webp';
import Image3 from '../../visionAssessments/colorblind-test-image3.webp';
import Image4 from '../../visionAssessments/colorblind-test-image4.webp';
import Image5 from '../../visionAssessments/colorblind-test-image5.webp';
import Image6 from '../../visionAssessments/colorblind-test-image6.webp';
import Image7 from '../../visionAssessments/colorblind-test-image7.webp';
import Image8 from '../../visionAssessments/colorblind-test-image8.webp';
import Image9 from '../../visionAssessments/colorblind-test-image9.webp';
import Image10 from '../../visionAssessments/colorblind-test-image10.webp';
import Image11 from '../../visionAssessments/colorblind-test-image11.webp';
import Image12 from '../../visionAssessments/colorblind-test-image12.webp';

export default function ColorBlindnessTest() {

  return <Sidebar screenComponent={< ColorBlindnessTestScreen />} />
}

const ColorBlindnessTestScreen = () => {
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
          <p>What number do you see in the image?</p>
        </div>

        <div className='flex items-center justify-center'>
          <div className="screen-box ">
            <p className="user-input">{userInput}</p>
            {/* <div className="number-buttons">{numberButtons}</div> */}
            <div className="flex flex-wrap max-w-xs mx-auto p-2  ">
              <button key={1} onClick={() => handleNumberButtonClick(1)} className="w-1/3 px-4  p-2 bg-[#374151] rounded-sm text-white">1</button>
              <button key={2} onClick={() => handleNumberButtonClick(2)} className="w-1/3  p-2 bg-[#374151] rounded-sm text-white">2</button>
              <button key={3} onClick={() => handleNumberButtonClick(3)} className="w-1/3  p-2 bg-[#374151] rounded-sm text-white">3</button>
              <button key={4} onClick={() => handleNumberButtonClick(4)} className="w-1/3  p-2 bg-[#374151] rounded-sm text-white">4</button>
              <button key={5} onClick={() => handleNumberButtonClick(5)} className="w-1/3  p-2 bg-[#374151] rounded-sm text-white">5</button>
              <button key={6} onClick={() => handleNumberButtonClick(6)} className="w-1/3  p-2 bg-[#374151] rounded-sm text-white">6</button>
              <button key={7} onClick={() => handleNumberButtonClick(7)} className="w-1/3  p-2 bg-[#374151] rounded-sm text-white">7</button>
              <button key={8} onClick={() => handleNumberButtonClick(8)} className="w-1/3  p-2 bg-[#374151] rounded-sm text-white">8</button>
              <button key={9} onClick={() => handleNumberButtonClick(9)} className="w-1/3  p-2 bg-[#374151] rounded-sm text-white">9</button>
            </div>
          <button onClick={handleSubmit}>Submit</button>
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

  const renderResults = () => {
    return (
      <div>
        <h2>Test Results</h2>
        {results.map((result, index) => (
          <p key={index}>
            Image {result.imageId}: {result.isCorrect ? 'Correct' : 'Incorrect'}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">

      <div className="p-5 mt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[70%] mx-auto mb-5">

      <div className="flex flex-col items-center">
                <h3 className="text-2xl sm:text-4xl font-bold font-sans text-[#374151] mt-10">Color Blind Test</h3>
                <p className="font-sans text-base mt-2 mb-8">Find out if you're color blind in less than 2 minutes!</p>
                <div className="flex justify-center">
                  <img src={require('../../assets/images/visionAssessments/colorblind.webp')} alt="Color Blind Test" />
                </div>
              </div>
              <p className='mt-10 text-justify'>Color Blind Test info: This fairly common condition often goes undiagnosed, because
            you do not realize you aren’t seeing colors as other people do. Yet testing for color
            blindness is simple — doesn’t even require a trip to the doctor.
            Simply look at the symbols below and enter the numbers that you can see. You’ll get an
            instant result that will help you if you are struggling with color blindness, and which
            colors are more problematic.</p>
          <p className='mt-5 font-semibold mb-10'>Note: this is test is based off the standard Ishihara color plate test</p>
        <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10 ">


          <div className='flex justify-center'>
            {showResults ? (
              renderResults()
            ) : (
              <div>
                {renderImage()}
                {renderProgressBar()}
              </div>
            )}
          </div>

          <div className="w-full flex items-center justify-center">
            <div className="md:ml-auto md:text-right text-center mt-16 mb-10">
              <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
              <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Account</button>
            </div>
          </div>

        </div>

      </div>



    </div>
  );
};

