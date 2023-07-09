import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (

    <div className="h-screen ">

      <div className="flex flex-col mx-auto h-full w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] p-4 ">
        <div className="flex  flex-col w-4/5 mx-auto flex-1 justify-center mb-8">
          <h1 className='font-sans font-bold text-2xl  mx-auto mb-[10px] sm:text-3xl lg:text-4xl' >EyeTry Home Page!</h1>

          <p className='mx-auto font-sans text-sm xl:text-base w-[90%] text-center'> Home Page (Public Route).</p>

          <div className="mx-auto" >
            <img src='https://content.pymnts.com/wp-content/uploads/2023/01/emea-smart-glasses.jpg' alt="logo" className='w-full h-full object-cover mt-8 rounded-full' />
          </div>
          <p className='mx-auto font-sans text-sm xl:text-base w-[90%] text-center mt-12 text-justify'> 
          Home Page will be the default route with route path "/". 
          Home page is not completed yet so click on the continue button to start using the application. 
          If you are not logged in, It will redirect you to the login page.</p>
          <div className="mt-6 text-center">
            <Link to="/user/profile"><button className="w-[70%] justify-center px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md
                        hover:bg-gray-700 focus:outline-none focus:bg-black">Continue Using Application</button></Link>
          </div>
        </div>
      </div>
    </div>

  );
}

