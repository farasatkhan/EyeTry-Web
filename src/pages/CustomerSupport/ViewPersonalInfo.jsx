import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { FaRegEnvelope, FaUser, } from "react-icons/fa";

const ViewPersonalInfo = () => {

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')

    return (
        <div class="flex items-center justify-center h-screen">
            <div className="bg-white border border-gray-200 rounded-lg shadow w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div class="flex items-center justify-between w-full">
                        <h2 class="mr-auto text-xl font-bold tracking-tight text-gray-900">Personal Information</h2>
                        <Link to='/user/my_details'><button class="py-1 px-4 rounded inline-flex items-center ml-auto
         bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
         hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} class="mr-2" />
                            <span>Edit</span>
                        </button></Link>
                    </div>
                </div>
                <hr class="border-3 border-gray-300 my-4" />
                <div className="p-5">
                    <div className="flex flex-row space-x-4">
                        <div className="flex-grow">
                            <label for="firstname" className="block text-sm font-semibold text-gray-800 font-sans">First Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input disabled value={firstName} onChange={(e) => setFirstName(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
        focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
        sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your First Name" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="block text-sm font-semibold text-gray-800 font-sans">Last Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input disabled value={lastName} onChange={(e) => setLastName(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
        focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
        sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Last Name" type="text" />
                            </div>
                        </div>
                    </div>


                    <label for="email" className="block text-sm mt-5 font-semibold text-gray-800 font-sans">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRegEnvelope color='grey' />
                        </div>
                        <input disabled value={email} onChange={(e) => setEmail(e.target.value)} id='email' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                    sm:text-sm transition duration-150 ease-in-out" placeholder="info@yourmai.com" type="email" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewPersonalInfo;