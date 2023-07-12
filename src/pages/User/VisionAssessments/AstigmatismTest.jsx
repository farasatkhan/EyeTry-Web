import React, { useState, useEffect } from 'react';
import image1 from '../../../assets/images/visionAssessments/astigmatism1.gif'
import image2 from '../../../assets/images/visionAssessments/astigmatism2.gif'
import image3 from '../../../assets/images/visionAssessments/astigmatism3.gif'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import axios from 'axios'
import { reGenerateAccessToken } from '../../../api/authapi';
import bannerImg from '../../../assets/images/visionAssessments/colorblind.webp'


const AstigmatismTestScreen = () => {

    const [status, setStatus] = useState(false);
    const baseURL = 'http://localhost:3000'


    const submitVisionAssessmentResult = async () => {
        const data = {
            testType: "Astigmatism Test",
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

    const images = [
        { path: image1, answer: true },
        { path: image2, answer: false },
        { path: image3, answer: true },
        // Add more images with their associated answers here
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [shuffledImages, setShuffledImages] = useState([]);

    useEffect(() => {
        shuffleImages();
    }, []);

    const shuffleImages = () => {
        const shuffledImages = [...images].sort(() => Math.random() - 0.5);
        setCurrentIndex(0);
        setAnswers([]);
        setShowResults(false);
        setShuffledImages(shuffledImages);
    };

    const handleAnswer = (answer) => {
        setAnswers([...answers, answer]);
        if (currentIndex === shuffledImages.length - 1) {
            const pass = answers.every((answer, index) => answer === shuffledImages[index].answer);
            setStatus(pass); // Set the status based on the pass variable
            setShowResults(true);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const renderImage = () => {
        if (shuffledImages.length === 0) {
            return null;
        }

        const currentImage = shuffledImages[currentIndex];
        return (
            <div>
                <div className=' w-[400px] h-[400px] flex justify-center'>
                    <img className='  ' src={currentImage.path} alt={`Astigmatism Test ${currentIndex + 1}`} />
                </div>

                <div className='mt-5 mx-auto flex justify-center space-x-3'>
                    <button class="px-10 py-2 bg-gray-700 text-white rounded" onClick={() => handleAnswer(true)}>Yes</button>
                    <button class=" px-10 py-2 bg-red-700 text-white rounded" onClick={() => handleAnswer(false)}>No</button>
                </div>
            </div>
        );
    };

    const renderResults = () => {
        const pass = answers.every((answer, index) => answer === shuffledImages[index].answer);
        return (
            <div>
                <h2 className='font-bold font-sans text-2xl mb-5'>Test Results</h2>
                {pass ? (
                    <div className="pass-result  text-green-700">
                        <AiOutlineCheckCircle size={24} />
                        <p>You passed the Astigmatism Test!</p>
                    </div>
                ) : (
                    <div className="fail-result text-red-700">
                        <AiOutlineCloseCircle size={24} />
                        <p>You failed the Astigmatism Test.</p>
                    </div>
                )}                
                <div className='flex space-x-3 mt-10' >
                <button className='px-4 py-2 bg-red-700 text-white rounded"' onClick={shuffleImages}>Retake Test</button>
                <button
                    className="px-4 py-2 bg-gray-700 text-white rounded"
                    onClick={submitVisionAssessmentResult}
                >
                    Save Results
                </button>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col items-center">
                <h3 className="text-2xl sm:text-4xl font-bold font-sans text-[#374151] mt-10">Astigmatism Test</h3>
                <p className="font-sans text-base mt-2 mb-8">Find out if you have contrast sensitivity problem in less than 2 minutes!</p>
                <div className="flex justify-center">
                    <img src={bannerImg} alt="Color Blind Test" />
                </div>
            </div>
            <div className="p-5 mt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10 ">
                    <h2 className='text-3xl font-bold mb-4 mt-10'>Astigmatism Eye Test</h2>
                    <p className='mt-10 text-justify font-sans'>
                        An astigmatism test is a type of vision test that determines whether an individual has astigmatism, which is a common refractive error that affects the shape of the eye's cornea or lens. Astigmatism causes blurred or distorted vision at all distances.

                        There are different methods used to test for astigmatism, and they are typically performed by eye care professionals, such as optometrists or ophthalmologists. </p>
                    <h3 className="text-2xl sm:text-3xl font-bold  text-[#374151] mt-10">Take Test Now</h3>

                    <div className='mx-auto flex flex-col justify-center items-center'>
                        <h2 className='text-base font-sans font-semibold mb-4 mt-10'>Do you see the lines equally clear and with same thickness? If Yes, then click the YES button otherwise click the NO button below the image.</h2>
                        <div>
                            {showResults ? renderResults() : renderImage()}
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default AstigmatismTestScreen;