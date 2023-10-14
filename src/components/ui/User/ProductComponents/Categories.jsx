import React from "react";

const CategoryFilter = ({ selectedCategory, onCategorySelect }) => {
    const sizeOptions = [
        "All Categories",
        "Eyeglasses",
        "Sunglasses",
        "Men",
        "Women",
        "Kids",
    ];

    const handleCategoryClick = (category) => {
        // Update the selected size when a size is clicked
        onCategorySelect(category);
    };

    return (
        <>
            <div className="absolute left-0 p-2 bg-white shadow-lg z-50 w-[300px] cursor-pointer">
                <ul className="space-y-2 cursor-pointer">
                    {sizeOptions.map((category, index) => (
                        <li
                            key={index}
                            className={` rounded-sm py-1 px-1 transition duration-200 ease-in-out
                            ${selectedCategory === category ? 'bg-gray-700 hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                            <div  onClick={() => handleCategoryClick(category)} className="cursor-pointer flex items-center">
                                <input className="cursor-pointer w-5 h-4 mr-5"
                                    type="checkbox"
                                    id={category}
                                    checked={selectedCategory === category}
                                    onChange={() => handleCategoryClick(category)}
                                />
                                <label
                                    htmlFor={category}
                                    className={`font-sans cursor-pointer ${
                                        selectedCategory === category ? "text-white " : ""
                                    }`}
                                >
                                    {category}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default CategoryFilter;
