import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function GiftCardsScreen() {
    // for dropdown
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow  w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[70%] mx-auto mt-10">
                    <div className=" text-center md:mb-0 mb-4">
                        <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Manage Gift Cards</h3>
                        <p className=" font-sans text-base mt-3">Manage Your Gift Cards</p>
                    </div>

                    <div className=" bg-white border mt-20 border-gray-200 rounded-lg shadow">
                        <div className="flex flex-row mt-5">
                            <div className="left-0 pl-3 flex items-center pointer-events-none">
                                <FaBookOpen size={30} className="mr-5 pb-1" />
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <h2 className="mr-auto text-xl font-bold tracking-tight text-gray-900 ">Buy Giftcard</h2>

                            </div>
                        </div>
                        <hr className="border-3 border-gray-300 my-4" />
                        <div className="p-5">

                            <span className="flex flex-row space-x-5">
                                <div className="w-56  ">
                                    <Box sx={{ minWidth: 120 }} className>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Sunglasses giftcard</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={age}
                                                label="Sunglasses giftcard"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div className="w-56  ">
                                    <Box sx={{ minWidth: 120 }} className>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">200 USD</InputLabel>
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
                                <button className="ml-5 px-4 rounded inline-flex items-center 
                                            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                             hover:text-white border border-blue-500 hover:border-transparent ">
                                    <span>Check Balance</span>
                                </button>
                            </span>


                        </div>
                    </div>


                    <div className=" bg-white border border-gray-200 rounded-lg shadow w-[80%] mx-auto mb-10">
                        <div className="flex flex-row mt-5">
                            <div className="left-0 pl-3 flex items-center pointer-events-none">
                                <FaBookOpen size={30} className="mr-5 pb-1" />
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <h2 className="mr-auto text-xl font-bold tracking-tight text-gray-900 ">Manage Gift Cards</h2>
                            </div>
                        </div>
                        <hr className="border-3 border-gray-300 my-4" />
                        <div className="p-5">

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left text-gray-500 ">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Gift Card Number
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Value
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Type
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Edit
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b  hover:bg-gray-50 ">
                                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                    gitfcard 1
                                                </td>
                                                <td className="px-6 py-4">
                                                    5/20/2023
                                                </td>
                                                <td className="px-6 py-4">
                                                    type 1
                                                </td>
                                                <td className=" py-4 text-right">
                                                    <button className="py-1 px-4 rounded inline-flex items-center ml-auto
            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
            hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                                                        <FaBookOpen size={20} className="mr-2" />
                                                        <span>Edit</span>
                                                    </button>
                                                    <button className="py-1 px-4 rounded inline-flex items-center ml-auto
            bg-transparent hover:bg-red-500 text-red-700 font-semibold 
            hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                                                        <FaBookOpen size={20} className="mr-2" />
                                                        <span>Delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <Link to='/user/profile'><button type="button" className="w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10">Save</button></Link>
                    </div>

                </div>

            </div>

        </div>


    );
}

