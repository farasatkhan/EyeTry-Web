import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../layouts/User/UserProfilingSidebar";
import {  FaUser } from "react-icons/fa";

// for date picker
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function Wishlist() {

    return <Sidebar screenComponent={< AddPaymentScreen />} />
}


function AddPaymentScreen() {
    // for date picker
    const [value, setValue] = React.useState(dayjs('2022-04-17'));
    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">


                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                    <div class=" text-center md:mb-0 mb-4 mx-auto">
                        <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Add Payment Method</h3>
                        <p className=" font-sans text-base mt-3">Select Your Payment Method</p>
                    </div>

                    <div className="mt-10 justify-center p-10 flex flex-col sm:flex-row space-y-5 sm:space-y-0 space-x-0 sm:space-x-5 py-16 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img src={require('../../../assets/images/UserProfiling/stripe.png')} alt="logo" className='w-50 h-50 ' />
                        <img src={require('../../../assets/images/UserProfiling/paypal.png')} alt="logo" className='w-50 h-50 ' />
                    </div>



                    <div className="relative flex items-center justify-center w-full mt-14  border border-t sm:w-4/5  mx-auto">
                        <div className="absolute px-5 text-sm bg-white font-sans">OR</div>
                    </div>

                    <p className="font-sans text-lg font-bold mt-20">Credit Card Information</p>

                    <div className="relative mt-5">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser color='grey' />
                        </div>
                        <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Legal Name on Credit Card" type="text" />
                    </div>

                    <div className="flex flex-row space-x-4 mt-10">

                        <div className="flex-grow">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Card Number" type="number" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="CVV" type="number" />
                            </div>
                        </div>

                        {/* date picker */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
                                <DatePicker
                                    label="Expiry Date"
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                />
                            </DemoContainer>

                        </LocalizationProvider>
                    </div>

                    <p className="font-sans text-lg font-bold mt-20">Billing Address</p>

                    <div className="relative mt-5">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser color='grey' />
                        </div>
                        <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Apartment, suite, etc (optional)" type="text" />
                    </div>


                    <div className="flex flex-row space-x-4">
                        <div className="flex-grow">
                            <label for="firstname" className=" mt-10 block text-sm font-semibold text-gray-800 font-sans">City</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5  bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your City" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">Postal Code</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Last Name" type="number" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row space-x-4">
                        <div className="flex-grow">
                            <label for="firstname" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">Phone</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5  bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your First Name" type="phone" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">Country</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Last Name" type="tel" />
                            </div>
                        </div>
                    </div>


                    <div className="md:ml-auto md:text-right text-center mt-20">
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
                        <Link to='/profile'><button type="button" class=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

