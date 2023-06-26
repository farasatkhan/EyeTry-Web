import React from 'react';
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { AiOutlineLock } from "react-icons/ai";
import { FiLock } from "react-icons/fi";

function PasswordReset() {
  return (
    <div className="h-screen ">
            
            <div className="flex flex-col mx-auto h-full w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] p-4 ">
                <div className="flex  flex-col w-4/5 mx-auto flex-1 justify-center mb-8">
                    <h1 className='font-sans font-bold text-2xl  mx-auto mb-[50px] sm:text-3xl lg:text-4xl' >Password Reset</h1>

                    <p className='mx-auto font-sans text-sm xl:text-base w-[90%] text-center'>Password has been reset successfully</p>

                    <div className="mx-auto" >
                        <img src={require('../../assets/images/success.png')} alt="logo" className='w-[300px] h-[300px] object-cover' />
                    </div>
                    <div className="mt-14 text-center">
                        <button className="w-[70%] justify-center px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md
                        hover:bg-gray-700 focus:outline-none focus:bg-black">Back To Login</button>
                    </div>
            </div>
        </div>
</div>
    
);
}

export default PasswordReset;

