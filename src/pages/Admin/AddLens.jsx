import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from "../../components/ui/Navbar";
import Footer from "../../layouts/User/Footer";
import AdminSidebar from "../../layouts/Admin/AdminSidebar";
import { FaBookOpen } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

// tags input imports
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import ColorPalette from '../../components/ui/Admin/ColorPaletteComponent/ColorPaletteComponent';


export default function AddLens() {

    return <AdminSidebar screenComponent={< AddFramesScreen />} />
}

function AddFramesScreen() {
    // for radio buttons
    // const [selectedOption, setSelectedOption] = useState('option1');

    // const handleOptionChange = (event) => {
    //     setSelectedOption(event.target.value);
    // };

    // for dropdown
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };


    // product size 

    const [selectedSize, setSelectedSize] = useState('');

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    }

    // add products images

    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const imageUrls = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = (e) => {
                imageUrls.push(e.target.result);

                // If all images have been processed, update the state
                if (imageUrls.length === files.length) {
                    setImages((prevImages) => [...prevImages, ...imageUrls]);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = (index) => {
        setSelectedImage(images[index]);
    };
    const handleImageRemove = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };


    // color pallete
    const [selectedColors, setSelectedColors] = useState([]);
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'brown', 'gray'];

    const handleColorSelect = (colors) => {
        setSelectedColors(colors);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform the product addition logic here
        console.log('Selected Colors:', selectedColors);
    };

    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10 ">
                    <div class=" text-center mb-12" >
                        <h3 className="text-2xl sm:text-3xl  font-semibold font-sans">Add Lens</h3>
                    </div>


                    <div className="flex flex-col space-x-16 mx-auto lg:flex-row justify-center">
                        {/* add product images */}
                        <div>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                accept="image/*"
                                className=" hidden "
                                id="file-input"
                            />
                            <label
                                htmlFor="file-input"
                                className="inline-block mb-5 mt-4 whitespace-nowrap bg-[#374151] text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700"
                            >
                                Choose Image
                            </label>

                            {images.length > 0 && (
                                <div className="w-[350px]">
                                    <div className="flex flex-wrap">
                                        <div className="w-full">
                                            <img
                                                src={selectedImage || images[0]}
                                                alt="Big Product Image"
                                                className="w-full h-[350px] mb-4 object-cover rounded-sm"
                                            />
                                        </div>

                                        {images.slice(1, 7).map((imageUrl, index) => (
                                            <div
                                                key={index}
                                                className="w-1/3  px-2 "
                                                onClick={() => handleImageClick(index + 1)}
                                            >

                                                <div className="relative">
                                                    <img
                                                        src={imageUrl}
                                                        alt={`Product Image ${index + 1}`}
                                                        className="w-full h-[100px] mb-4 object-cover cursor-pointer"
                                                    />
                                                    <RiDeleteBack2Fill
                                                        onClick={() => handleImageRemove(index + 1)}
                                                        size={25}
                                                        className="absolute top-0 right-0 text-red-600 cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>

                            {/* product size buttons */}
                            <div>
                                <label for="framesize" className="block mb-2 text-base font-semibold text-gray-800 font-sans">Frame Size</label>
                                <div className="flex justify-center h-10 ">
                                    <button
                                        className={`mr-2 py-2 px-6 rounded-sm ${selectedSize === 'small'
                                            ? 'bg-red-700 text-white'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                            }`}
                                        onClick={() => handleSizeSelect('small')}
                                    >
                                        Small
                                    </button>
                                    <button
                                        className={`mx-2 py-2 px-6 rounded-sm ${selectedSize === 'medium'
                                            ? 'bg-red-700 text-white'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                            }`}
                                        onClick={() => handleSizeSelect('medium')}
                                    >
                                        Medium
                                    </button>
                                    <button
                                        className={`ml-2 py-2 px-6 rounded-sm ${selectedSize === 'large'
                                            ? 'bg-red-700 text-white'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                            }`}
                                        onClick={() => handleSizeSelect('large')}
                                    >
                                        Large
                                    </button>
                                </div>
                            </div>

                            {/* color palette  returns array of selected colors */}
                            <div className="mt-5">
                                <label className="block mb-2">Colors:</label>
                                <ColorPalette
                                    colors={colors}
                                    selectedColors={selectedColors}
                                    onColorSelect={handleColorSelect}
                                />
                            </div>

                            {/* input fields */}
                            <div className="flex-grow mt-5">
                                <label for="firstname" className="block text-base font-semibold text-gray-800 font-sans">Frame Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser color='grey' />
                                    </div>
                                    <input id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out" placeholder="Enter frame name" type="text" />
                                </div>
                            </div>
                            <div className="flex-grow mt-5">
                                <label for="lastname" className="block text-base font-semibold text-gray-800 font-sans">Price</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser color='grey' />
                                    </div>
                                    <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out" placeholder="$" type="number" />
                                </div>
                            </div>
                            <div className="flex-grow mt-5">
                                <label for="firstname" className="block text-base font-semibold text-gray-800 font-sans">Quantity</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser color='grey' />
                                    </div>
                                    <input id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                sm:text-sm transition duration-150 ease-in-out" placeholder="DD-MM-YY" type="text" />
                                </div>
                            </div>
                            <div className="flex-grow mt-5">
                                <label for="lastname" className="block text-base font-semibold text-gray-800 font-sans">Short Description</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser color='grey' />
                                    </div>
                                    <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out" placeholder="Enter short description" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row space-x-20  mb-5 mt-10">
                        <div className="flex-grow">
                            <label for="lastname" className="block text-base font-semibold text-gray-800 font-sans">Brand</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out" placeholder="Enter frame brand" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="block text-base font-semibold text-gray-800 font-sans">Type</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out" placeholder="Enter frame type" type="text" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row space-x-20 mt-6 mb-5">
                        <div className="flex-grow">
                            <label for="lastname" className="block text-base font-semibold text-gray-800 font-sans">Category</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out" placeholder="Enter frame category" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="block text-base font-semibold text-gray-800 font-sans">Sub Category</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out" placeholder="Enter sub category" type="text" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row space-x-20 mt-6 mb-5">
                        <div className="flex-grow">
                            <label for="lastname" className="block text-base font-semibold text-gray-800 font-sans">Lens Coating</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='material' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out" placeholder="Enter frame material" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="block text-base font-semibold text-gray-800 font-sans">Frame Style</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out" placeholder="Enter frame style" type="text" />
                            </div>
                        </div>
                    </div>



                    <label for="firstname" className="block text-base font-semibold text-gray-800 font-sans mb-2 mt-10">Product Tags</label>
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={tagSuggestions.map((option) => option.title)}
                        // defaultValue={[top100Films[13].title]}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="filled"
                                label="Tags"
                                placeholder="Favorites"
                            />
                        )}
                    />

                    <div>
                        <p className="mt-10 block text-base font-semibold text-gray-800 font-sans mb-3" ><label for="w3review">Enter Detailed Description</label></p>
                        <textarea className="block w-full p-2 pr-3 borderblock px-4 py-2.5 mt-2  bg-white rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out border-2" placeholder="Enter Detailed Description" id="w3review" name="w3review" rows="4" cols="50"></textarea>
                    </div>



                    <div className="flex justify-center mt-16">
                        <button type="button" className="w-36 sm:w-56 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Add Product</button>
                    </div>


                </div>

            </div>

        </div>

    );
}

const tagSuggestions = [
    { title: 'new arrival' },
    { title: 'fashon' },
    { title: 'top rated' },
    { title: 'modern' },
];