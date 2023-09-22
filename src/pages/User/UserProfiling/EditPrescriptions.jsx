import React, { useState } from "react";
import { Link } from "react-router-dom";
import {  FaUser,} from "react-icons/fa";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';


export default function EditPrescriptionsScreen() {
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

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10 ">
                    <div class=" text-center mb-12" >
                        <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Edit your prescription details</h3>
                    </div>


                    <label for="firstname" className="block text-base font-semibold text-gray-800 font-sans">Precription Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser color='grey' />
                        </div>
                        <input id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-3.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Enter prescription name" type="text" />
                    </div>


                    <div className="flex flex-row space-x-20 mt-10">
                        <div className="flex-grow">
                            <label for="firstname" className="block text-base font-semibold text-gray-800 font-sans">Date of Prescription</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-3.5 mt-2  bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="DD-MM-YY" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="block text-base font-semibold text-gray-800 font-sans">Birth Year</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-3.5 mt-2  bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="YYYY" type="text" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-lg font-sans font-bold mt-10">Pupilary Distance</p>
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


                        <div className="w-72 mt-10 ">
                            <Box sx={{ minWidth: 120 }} className>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Prescription Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Select Prescription Type"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>

                        <p className="text-lg font-sans font-bold mt-10 mb-5">Right Eye - OD</p>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '12ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-number"
                                    label="SPH"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="CYL"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Axis"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                />
                            </div>
                        </Box>

                        <p className="text-lg font-sans font-bold mt-10 mb-5">Right Eye - OD</p>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '12ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <div>
                                <TextField
                                    id="outlined-number"
                                    label="SPH"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="CYL"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                />
                                <TextField
                                    id="outlined-number"
                                    label="Axis"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        style: { height: 20 }
                                    }}
                                />
                            </div>
                        </Box>

                        <div className=" text-center mt-20 mb-10 space-x-6">
                            <button type="button" class=" w-36 sm:w-56 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                         focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Cancel</button>
                            <Link to='/user/prescription_details'><button type="button" class="w-36 sm:w-56 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                         focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Save</button></Link>
                        </div>


                    </div>


                </div>


            </div>

        </div>


    );
}

