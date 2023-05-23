import React, { useState } from 'react';
import Sidebar from '../../components/ui/VissionAssessments/VissionAssessmentsSideBar'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

export default function ContrastSensitivityTest() {

    return <Sidebar screenComponent={< ContrastSensitivityTestScreen />} />
}



const ContrastSensitivityTestScreen = () => {
    const [imageLetters] = useState([
        ['D', 'P', 'X', 'H', 'C', 'B'],
        ['Y', 'P', 'T', 'U', 'A', 'G'],
        ['A', 'E', 'L', 'S', 'O', 'I'],
        ['O', 'C', 'R', 'M', 'E', 'U'],
        ['K', 'T', 'I', 'E', 'D', 'L'],
        ['X', 'R', 'P', 'O', 'K', 'A'],
        ['H', 'Q', 'D', 'Y', 'T', 'N'],
        ['G', 'A', 'U', 'N', 'P', 'S'],
    ]);
    const [userInput, setUserInput] = useState('');
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [testCompleted, setTestCompleted] = useState(false);
    const [testResults, setTestResults] = useState([]);

    const handleInputChange = (event) => {
        setUserInput(event.target.value.toUpperCase());
    };

    const handleNextLetter = (event) => {
        event.preventDefault();

        const letter = imageLetters.flat()[currentLetterIndex];
        const result = {
            letter,
            userInput,
            correct: userInput === letter,
        };

        setTestResults((prevResults) => [...prevResults, result]);
        setCurrentLetterIndex((prevIndex) => prevIndex + 1);
        setUserInput('');

        if (currentLetterIndex === imageLetters.flat().length - 1) {
            setTestCompleted(true);
        }
    };

    const handleReset = () => {
        setUserInput('');
        setCurrentLetterIndex(0);
        setTestCompleted(false);
        setTestResults([]);
    };

    return (

        <div className="flex flex-col min-h-screen">
            <div className="flex flex-col items-center">
                <h3 className="text-2xl sm:text-4xl font-bold font-sans text-[#374151] mt-10">Contrast Sensitivity Test</h3>
                <p className="font-sans text-base mt-2 mb-8">Find out if you have contrast sensitivity problem in less than 2 minutes!</p>
                <div className="flex justify-center">
                    <img src={require('../../assets/images/visionAssessments/colorblind.webp')} alt="Color Blind Test" />
                </div>
            </div>
            <div className="p-5 mt-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10 ">
                    <h3 className="text-2xl sm:text-4xl font-bold font-sans text-[#374151] mt-10">Take Test Now</h3>
                    <p className='mt-10 text-justify font-sans'>A contrast sensitivity test is a type of vision test that measures a person's ability to distinguish between light and dark contrasts. It assesses the visual system's sensitivity to differences in contrast levels at various spatial frequencies.

                        During a contrast sensitivity test, a series of visual stimuli are presented to the individual, typically in the form of patterns or letters. These stimuli vary in contrast and spatial frequency. The person being tested is usually asked to indicate when they can see the patterns or letters clearly.</p>
                    <h2 className='text-3xl font-bold mb-4 mt-10'>Contrast Sensitivity Eye Test</h2>
                    {!testCompleted ? (
                        <>
                            <div className='flex justify-center '>

                            </div>
                            <form onSubmit={handleNextLetter} className='mx-auto flex flex-col justify-center'>
                                <div className='w-[300px] h-[300px] mb-36 mx-auto mt-5'>
                                    <img src={require("../../assets/images/visionAssessments/contrast-sensitivity-test.jpg")} />
                                </div>
                                <div className="image-chart">
                                    {imageLetters.map((row, rowIndex) => (
                                        <div key={rowIndex}>
                                            {row.map((letter, columnIndex) => (
                                                <span
                                                    key={columnIndex}
                                                    className={
                                                        currentLetterIndex === rowIndex * row.length + columnIndex
                                                            ? 'active-letter'
                                                            : ''
                                                    }
                                                >
                                                </span>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <br />
                                <p className='mx-auto'>Enter the letter you see in the image. (Capital Letters)</p>
                                <label>
                                    <br />
                                    <input className='block w-[250px] mx-auto pl-10 pr-3 borderblock px-4  py-2  bg-white border rounded-md
                            border-blue-300 ring-blue-300 outline-none ring ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out"  type="text'
                                        type="text"
                                        value={userInput}
                                        onChange={handleInputChange} />
                                </label>
                                <br />
                                <button type="submit" class=" mx-auto w-36 sm:w-56 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                         focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2  mb-2 dark:bg-red-600 dark:hover:bg-red-700
                          dark:focus:ring-red-900">Next Letter</button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h3 className='font-sans text-lg font-bold mb-5'>Test Results:</h3>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-2 border border-gray-300">Letter</th>
                                        <th className="p-2 border border-gray-300">User Input</th>
                                        <th className="p-2 border border-gray-300">Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testResults.map((result, index) => (
                                        <tr key={index}>
                                            <td className="p-2 border border-gray-300">{result.letter}</td>
                                            <td className="p-2 border border-gray-300">{result.userInput}</td>
                                            <td className="p-2 border border-gray-300">
                                                {result.correct ? (
                                                    <AiOutlineCheckCircle className="text-green-500" />
                                                ) : (
                                                    <AiOutlineCloseCircle className="text-red-500" />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className='mt-5 mb-10'>
                                Overall Result:{' '}
                                {testResults.every((result) => result.correct)
                                    ? 'Congratulations! You passed the test.'
                                    : 'Sorry, you did not pass the test. Please try again.'}
                            </p>
                            <button className=' mx-auto w-36 sm:w-56 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                         focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2  mb-2 dark:bg-red-600 dark:hover:bg-red-700
                          dark:focus:ring-red-900' onClick={handleReset}>Restart Test</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

