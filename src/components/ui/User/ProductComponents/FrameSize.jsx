import React from "react";

const SizeFilter = ({ selectedSize, onSizeSelect }) => {
    const sizeOptions = [
        "All Size",
        "Small",
        "Medium",
        "Large",
        "Extra Large",
    ];

    const handleSizeClick = (size) => {
        // Update the selected size when a size is clicked
        onSizeSelect(size);
    };

    return (
        <>
            <div className="absolute left-0 p-2 bg-white shadow-lg rounded-md z-50 w-[300px] cursor-pointer">
                <ul className="space-y-2 cursor-pointer">
                    {sizeOptions.map((size, index) => (
                        <li
                            key={index}
                            className={` rounded-sm py-1 px-1 transition duration-100 ease-in-out
                            ${selectedSize === size ? 'bg-gray-700 hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                            <div  onClick={() => handleSizeClick(size)} className="cursor-pointer flex items-center">
                                <input className="cursor-pointer w-5 h-4 mr-5"
                                    type="checkbox"
                                    id={size}
                                    checked={selectedSize === size}
                                    onChange={() => handleSizeClick(size)}
                                />
                                <label
                                    htmlFor={size}
                                    className={`font-sans cursor-pointer ${
                                        selectedSize === size ? "text-white " : ""
                                    }`}
                                >
                                    {size}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default SizeFilter;
