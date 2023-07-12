import React, { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import {  uploadProfileImage } from '../../../api/userapi';
import defaultImage from '../../../assets/images/UserProfiling/pfpdefault.png';


export default function UploadUserImageScreen() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null); // State to store the uploaded image


    const handleImageChange = (event) => {
        const image = event.target.files[0];
        setSelectedImage(image);
        setUploadedImage(URL.createObjectURL(image)); // Use the "image" variable directly
        console.log(image)
    };
    


    const handleDefaultImageClick = () => {
        document.getElementById('image-input').click();
    };


    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                    <div class=" text-center md:mb-0 mb-4">
                        <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Upload User Image</h3>
                        <p className=" font-sans text-base mt-3">Manage Your Profile Picture</p>
                    </div>

                    <p className="text-xl font-sans font-bold mt-10">Add an Image</p>

                    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10 mx-auto mb-10">
                        <div class="flex flex-col items-center justify-between w-full p-5 pt-7 sm:flex-row sm:items-center">
                            <h2 class="mr-auto text-base font-sans tracking-tight text-gray-900 dark:text-white text-justify sm:w-auto sm:mr-5">
                                Please make sure your face is straight and level
                                and proper <p>lighting is available for an effective image capture</p>
                            </h2>
                            <button class="py-2.5 px-4 rounded inline-flex items-center sm:ml-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent justify-end mt-5 sm:mt-0">
                                <FaBookOpen size={20} class="mr-2" />
                                <span>Capture Image</span>
                            </button>
                        </div>
                        <div className="relative flex items-center justify-center w-full mt-5 border border-t sm:w-4/5 mx-auto">
                            <div className="absolute px-5 text-sm bg-white font-sans">OR</div>
                        </div>
                        <div className="p-5">
                            <div onClick={handleDefaultImageClick} className='w-full h-64 mt-5 flex justify-center cursor-pointer'>
                                { selectedImage ? <img 
                                    className='max-w-full max-h-full '  
                                    src={uploadedImage} // Use the uploaded image if available, otherwise use the default image
                                    alt="Preview" />
                                    :
                                    <img className='max-w-full max-h-full ' src={defaultImage} alt="preview" />
                                }
                            </div>
                        </div>
                    </div>
                    <div>

                        <input className="invisible" id="image-input"
                            type="file" accept="image/*" onChange={handleImageChange} />

                    </div>

                    {
        }
                    <div className="w-full flex items-center justify-center">
                        <button onClick={() => uploadProfileImage(selectedImage)} type="button" className="w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10 dark:bg-gray-800 dark:hover:bg-gray-700
                        dark:focus:ring-gray-700 dark:border-gray-700">Save</button>
                    </div>

                </div>

            </div>

        </div>


    );
}

