import React from 'react';
import {Link} from "react-router-dom";

function EmailSent() {
  return (
    <div className="h-screen ">
            
            <div className="flex flex-col mx-auto h-full w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] p-4 ">
                <div className="flex  flex-col w-4/5 mx-auto flex-1 justify-center mb-8">
                    <h1 className='font-sans font-bold text-2xl  mx-auto mb-[50px] sm:text-3xl lg:text-4xl' >Email Has Been Sent!</h1>

                    <p className='mx-auto font-sans text-sm xl:text-base w-[90%] text-center'> Check your inbox and open the received link to reset password</p>

                    <div className="mx-auto" >
                        <img src={require('../../../assets/images/UserProfiling/email.png')} alt="logo" className='w-[300px] h-[300px] object-cover' />
                    </div>
                    <div className="mt-14 text-center">
                        <Link to="/"><button className="w-[70%] justify-center px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md
                        hover:bg-gray-700 focus:outline-none focus:bg-black">Login</button></Link>
                    </div>
                    <p className="mt-12 text-base font-sans text-center text-gray-700">Didn’t receive an email? 
                            <Link to="/forgotpassword" className="font-medium font-sans text-[#3ba0e8] hover:underline"> Resend recovery email </Link>
                    </p>
            </div>
        </div>
</div>
    
);
}

export default EmailSent;

