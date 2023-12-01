import React, {useEffect} from "react";

const genderFilter = ({ selectedGender, onGenderSelect }) => {
    const sizeOptions = [
        "All Genders",
        "Male",
        "Female",
        "Kids"
    ];


    
    
    const handleGenderClick = (gender) => {
        // Update the selected gender when a gender is clicked
        onGenderSelect(gender);
    };
    
    return (
        <>
            <div className="absolute left-0 p-2 bg-white shadow-lg rounded-md z-50 w-[300px] cursor-pointer">
                <ul className="space-y-2 cursor-pointer">
                    {sizeOptions.map((gender, index) => (
                        <li
                            key={index}
                            className={` rounded-sm py-1 px-1 transition duration-100 ease-in-out
                            ${selectedGender === gender ? 'bg-gray-700 hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                            <div  onClick={() => handleGenderClick(gender)} className="cursor-pointer flex items-center">
                                <input className="cursor-pointer w-5 h-4 mr-5"
                                    type="checkbox"
                                    id={gender}
                                    checked={selectedGender === gender}
                                    onChange={() => handleGenderClick(gender)}
                                />
                                <label
                                    htmlFor={gender}
                                    className={`font-sans cursor-pointer ${
                                        selectedGender === gender ? "text-white " : ""
                                    }`}
                                >
                                    {gender}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default genderFilter;
