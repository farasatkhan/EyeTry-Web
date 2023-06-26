import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import Sidebar from "../../components/ui/UserProfilingSidebar";
import { FaBookOpen } from "react-icons/fa";
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";


export default function MyDetails() {

    return <Sidebar screenComponent={< MyDetailsScreen />} />
}

function MyDetailsScreen() {
    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                    <div className="mb-10 flex flex-col md:flex-row md:items-center">
                        <div class="md:text-left text-center md:mb-0 mb-4">
                            <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Personal Information</h3>
                            <p className=" font-sans text-base ">Edit your profile quickly</p>
                        </div>
                        <div className="md:ml-auto md:text-right text-center">
                            <Link to='/delete_account'><button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete Account</button></Link>
                            <Link to='/change_password'><button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Change Password</button></Link>
                        </div>
                    </div>


                    <label for="firstname" className="block text-sm font-semibold text-gray-800 font-sans">First Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser color='grey' />
                        </div>
                        <input id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your First Name" type="text" />
                    </div>

                    <label for="lastname" className="block text-sm mt-10 font-semibold text-gray-800 font-sans">Last Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser color='grey' />
                        </div>
                        <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Last Name" type="text" />
                    </div>

                    <label for="email" className="block text-sm mt-10 font-semibold text-gray-800 font-sans">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRegEnvelope color='grey' />
                        </div>
                        <input id='email' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="info@yourmai.com" type="email" />
                    </div>

                    <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10  mx-auto mb-10">
                        <div className="flex flex-row mt-5">
                            <h4 class=" ml-5  text-lg font-bold tracking-tight text-gray-900 dark:text-white font-sans">Your Photo</h4>
                        </div>
                        <hr class="border-3 border-gray-300 my-4" />
                        <div className="p-5">
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <div style={{ width: 70, height: 70, borderRadius: 50, backgroundColor: "red", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src={require('../../assets/images/profilepic.png')} alt="logo" className='w-full h-full ' />
                                </div>
                                <h2 style={{ fontWeight: 700, fontSize: 18, marginTop: 10, marginBottom: 20, marginLeft: 15 }}>Alliyan Waheed <span className="flex flex-row space-x-5" ><p className=" text-red-700 font-sans font-medium" >Delete</p> <p className="text-blue-700 font-sans font-medium" >Update</p></span>   </h2>
                            </div>

                            <Link to='/upload_user_image'><img src={require('../../assets/images/pfpdefault.png')} alt="logo" className='w-full h-full mt-5' /></Link>

                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <Link to='/profile'><button type="button" className="w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10 dark:bg-gray-800 dark:hover:bg-gray-700
                        dark:focus:ring-gray-700 dark:border-gray-700">Save</button></Link>
                    </div>
                </div>
            </div>
        </div>


    );
}

