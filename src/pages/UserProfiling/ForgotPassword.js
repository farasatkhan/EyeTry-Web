import React from 'react';
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div className="h-screen ">
            
            <div className="flex flex-col mx-auto h-full w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] p-4 ">
                <div className="flex  flex-col w-4/5 mx-auto flex-1 justify-center mb-8">
                    <h1 className='font-sans font-bold text-2xl  mx-auto mb-[50px] sm:text-3xl lg:text-4xl' >Forgot Password</h1>

                    <p className='mx-auto font-sans text-justify text-sm xl:text-base w-[90%]'>Enter the email associated with your account. We’ll send an email with instructions to reset your password</p>
 
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

                        <div className="mt-14 ">
                            <Link to="/emailsent"><button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:bg-black">Send Reset Link</button></Link>
                        </div>

                        <p className="mt-12 text-base font-sans text-center text-gray-700">Remember Password? 
                            <Link to="/signin" className="font-medium font-sans text-[#3ba0e8] hover:underline"> Back To Login</Link>
                        </p>
            
                    </form>
            </div>
        </div>
</div>
    
);
}

export default ForgotPassword;

