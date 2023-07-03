import React from 'react';
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { FiLock } from "react-icons/fi";

function AdminSignin() {
  return (
    <div className="h-screen ">
            
            <div className="flex flex-col mx-auto h-full w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] p-4 ">
                <div className="flex  flex-col w-4/5 mx-auto flex-1 justify-center mb-8">
                    <h1 className='font-sans font-bold text-2xl  mx-auto mb-[50px] sm:text-3xl lg:text-4xl' >Administrator Sign In!</h1>

                    <form className="mt-6 w-[90%] mx-auto">

                        <label for="email" className="block text-sm font-semibold text-gray-800 font-sans">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaRegEnvelope color='grey'/>
                            </div>
                            <input id='email' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="info@yourmai.com" type="email"/>
                        </div>
            
                        <label for="password" className="block text-sm font-semibold text-gray-800 mt-5 font-sans">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock color='grey' height="50" width="500"/>
                            </div>
                            <input id='password' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 
                            bg-white border rounded-md focus:border-blue-300 focus:ring-blue-300 focus:outline-none 
                            focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="******" type="password"/>
                        </div>

                        <div className='flex flex-row justify-between'>
                            <label htmlFor="keep-signed-in" className="flex items-center mt-7">
                                <input type="checkbox" id="keep-signed-in" name="keep-signed-in" className="form-checkbox w-4 h-4"/>
                                <span className="ml-2 text-sm text-gray-500 font-sans">Keep me signed in</span>
                            </label>
                            <div className='mt-6 flex-grow text-right'>
                                <a href="#" className="text-[15px] text-[#1C9CEA] hover:underline font-semibold font-sans">Forgot Password?</a>
                            </div>
                        </div>


                        <div className="mt-14 ">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:bg-black">Login</button>
                        </div>
            
                    </form>
            </div>
        </div>
</div>
    
);
}

export default AdminSignin;

