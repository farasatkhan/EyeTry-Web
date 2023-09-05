import React from "react";
import yellowGlassesImg from "../../../../assets/images/UserProfiling/yellowglasses.png";

  
  export default  function SelectLensTypeScreen(props) {
    const Component = props.screenComponent;
  
    return (
      <div className="h-screen">
        <div className="flex flex-col md:flex-row items-center h-full px-4 sm:px-0">
          {/* section 1 */}
          <div className="h-full w-full sm:w-[65%] md:mt-0 flex items-center justify-center mt-20 border-b-4 border-gray-500">
            <div className="w-11/12 sm:w-85">
              <div className="h-1/2">
                <div className="">
                  <img src={yellowGlassesImg} alt="logo" className="w-full h-full" />
                </div>
              </div>
  
              <div className="px-20 flex flex-row mx-auto mt-10">
                <div>
                  <h5 className="font-sans text-3xl font-bold mr-10">{props.name}</h5>
                  <p className="font-sans text-md font-semibold mb-10">{props.description}</p>
                </div>
                <div className="ml-auto">
                  <h5 className="font-sans text-3xl font-bold">{props.price}</h5>
                </div>
              </div>
            </div>
          </div>
  
          {/* section 2 */}
          <div className="flex flex-col h-full w-full md:w-[35%] shadow-lg shadow-left">
            <div className="flex flex-col w-[90%] mx-auto flex-1 justify-center mb-8">
              <div className="mx-auto">
                {Component}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  