import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import Sidebar from "../../components/ui/Sidebar";
import { FaBookOpen } from "react-icons/fa";
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { FiLock } from "react-icons/fi";


export default function ChangePassword() {

    return <Sidebar screenComponent={< ChangePasswordScreen />} />
}

function ChangePasswordScreen() {
    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                    <div className="mb-10 flex flex-col md:flex-row md:items-center">
                        <div class="md:text-left text-center md:mb-0 mb-4">
                            <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Change Password</h3>
                            <p className=" font-sans text-base ">Update your password quickly by using current password</p>
                        </div>
                    </div>


                    <label for="password" className="block text-sm font-semibold text-gray-800 mt-10 font-sans">Current Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock color='grey' height="50" width="500" />
                        </div>
                        <input id='password' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 
                            bg-white border rounded-md focus:border-blue-300 focus:ring-blue-300 focus:outline-none 
                            focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="******" type="password" />
                    </div>
                    <label for="password" className="block text-sm font-semibold text-gray-800 mt-10 font-sans">New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock color='grey' height="50" width="500" />
                        </div>
                        <input id='password' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 
                            bg-white border rounded-md focus:border-blue-300 focus:ring-blue-300 focus:outline-none 
                            focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="******" type="password" />
                    </div>
                    <label for="password" className="block text-sm font-semibold text-gray-800 mt-10 font-sans">Confirm Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock color='grey' height="50" width="500" />
                        </div>
                        <input id='password' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 
                            bg-white border rounded-md focus:border-blue-300 focus:ring-blue-300 focus:outline-none 
                            focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="******" type="password" />
                    </div>


                    <div className="w-full flex items-center justify-center">
                        <div className="md:ml-auto md:text-right text-center mt-16 mb-10">
                            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
                            <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Change Password</button>
                        </div>
                    </div>



                </div>


            </div>

        </div>


    );
}

