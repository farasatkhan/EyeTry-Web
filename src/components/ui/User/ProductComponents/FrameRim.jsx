import React from "react";
import full_rim from '../../../../assets/images/products/frameRims/full_rim.png'
import rim_less from '../../../../assets/images/products/frameRims/rim_less.png'
import rim_semi from '../../../../assets/images/products/frameRims/rim_semi.png'


const shapeImages = {
    "All Rims": null,
    "Full Rim": full_rim,
    "Rim Less": rim_less,
    "Semi Rim": rim_semi,

};

const shapeFilter = ({ selectedRim, onRimSelect }) => {
    const sizeOptions = [
        "All Rims",
        "Full Rim",
        "Rim Less",
        "Semi Rim",
    ];

    const handleShapeClick = (shape) => {
        // Update the selected shape when a shape is clicked
        onRimSelect(shape);
    };

    return (
        <>
            <div className="absolute left-0 p-2 bg-white shadow-lg rounded-md z-50 w-[300px] cursor-pointer">
                <ul className="space-y-2 cursor-pointer">
                    {sizeOptions.map((Rim, index) => (
                        <li
                            key={index}
                            className={` rounded-sm py-1 px-1 transition duration-100 ease-in-out
                            ${selectedRim === Rim ? 'bg-gray-700 hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                            <div onClick={() => handleShapeClick(Rim)} className="cursor-pointer flex items-center">
                                <input className="cursor-pointer w-5 h-4 mr-5"
                                    type="checkbox"
                                    id={Rim}
                                    checked={selectedRim === Rim}
                                    onChange={() => handleShapeClick(Rim)}
                                />
                                <img
                                    src={shapeImages[Rim]}
                                    className="w-6 h-3 mr-2"
                                />
                                <label
                                    htmlFor={Rim}
                                    className={`font-sans cursor-pointer ${selectedRim === Rim ? "text-white " : ""
                                        }`}
                                >
                                    {Rim}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default shapeFilter;
