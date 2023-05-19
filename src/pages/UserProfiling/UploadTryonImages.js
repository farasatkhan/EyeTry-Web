import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import Sidebar from "../../components/ui/Sidebar";
import { FaBookOpen } from "react-icons/fa";
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export default function UploadTryonImages() {

    return <Sidebar screenComponent={< UploadTryonImagesScreen />} />
}

function UploadTryonImagesScreen() {
    // for radio buttons
    const [selectedOption, setSelectedOption] = useState('option1');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // for dropdown
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                    <div class=" text-center md:mb-0 mb-4">
                        <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Upload Try On Image</h3>
                        <p className=" font-sans text-base mt-3">Manage Your Try-On Images</p>
                    </div>

                    <p className="text-xl font-sans font-bold mt-10">Step 1: Select Your PD(Pupillary Distance)</p>

                    <p className="text-lg font-sans font-bold mt-10">PD - Pupillary Distance</p>
                    <div className="text-lg font-sans font-semibold flex items-center ml-5 mt-2" >
                        <label class="flex items-center">
                            <input
                                type="radio"
                                value="option1"
                                checked={selectedOption === 'option1'}
                                onChange={handleOptionChange}
                                className="w-5 h-5 mr-2"
                            />
                            <span class="ml-2">Option 1</span>
                        </label>

                        <label class="flex items-center ml-4">
                            <input
                                type="radio"
                                value="option2"
                                checked={selectedOption === 'option2'}
                                onChange={handleOptionChange}
                                className="w-5 h-5 mr-2"
                            />
                            <span class="ml-2">Option 2</span>
                        </label>
                    </div>

                    <span className="flex flex-row mt-3">
                        <input id='email' className="block w-full sm:w-[80%] lg:w-[50%] pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
        focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
        sm:text-sm transition duration-150 ease-in-out" placeholder="Enter your pupillary distance" type="number" />
                        <div class="ml-5">
                            <p class="text-sm mb-1">Don't know your Pupillary Distance (PD)?</p>
                            <button class="px-4 py-2 rounded inline-flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent">
                                <span>Find your IPD</span>
                            </button>
                        </div>
                    </span>


                    <p className="text-lg font-sans font-bold mt-10">Step 2: Add an Image</p>



                    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10 mx-auto mb-10">
                        <div class="flex flex-col items-center justify-between w-full p-5 pt-7 sm:flex-row sm:items-center">
                            <h2 class="mr-auto text-normal tracking-tight text-gray-900 dark:text-white  text-justify sm:w-auto sm:mr-5">Please make sure your face is straight and level
                                Use a photo without glasses.
                                Don’t tilt your head or use sideview
                            </h2>
                            <button class="py-2.5 px-4 rounded inline-flex items-center sm:ml-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent justify-end mt-5 sm:mt-0">
                                <FaBookOpen size={20} class="mr-2" />
                                <span>Capture Image</span>
                            </button>
                        </div>
                        <div className="relative flex items-center justify-center w-full mt-5 border border-t sm:w-4/5 mx-auto">
                            <div className="absolute px-5 text-sm bg-white font-sans">OR</div>
                        </div>
                        <div className="p-5">
                            <img src={require('../../assets/images/pfpdefault.png')} alt="logo" className='w-full h-full mt-5' />
                        </div>
                    </div>


                    <div className="w-full flex items-center justify-center">
                        <button type="button" className="w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10 dark:bg-gray-800 dark:hover:bg-gray-700
                        dark:focus:ring-gray-700 dark:border-gray-700">Save</button>
                    </div>



                </div>


            </div>


        </div>


    );
}

