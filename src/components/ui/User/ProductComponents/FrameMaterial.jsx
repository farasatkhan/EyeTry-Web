import React from "react";

const MaterialFilter = ({ selectedMaterial, onMaterialSelect }) => {
    const materialOptions = [
        "All Materials",
        "Acetate",
        "Metal",
        "Stainless Steel",
        "Titanium",
        "TR-90",
        "Plastic",
    ];

    const handleMaterialClick = (material) => {
        // Update the selected material when a material is clicked
        onMaterialSelect(material);
    };

    return (
        <>
            <div className="absolute left-0 p-2 bg-white rounded-md shadow-lg z-50 w-[300px] cursor-pointer">
                <ul className="space-y-2 cursor-pointer">
                    {materialOptions.map((material, index) => (
                        <li
                            key={index}
                            className={` rounded-sm py-1 px-3 transition duration-100 ease-in-out
                            ${selectedMaterial === material ? 'bg-gray-700 hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                            <div  onClick={() => handleMaterialClick(material)} className="cursor-pointer flex items-center">
                                <input className="cursor-pointer w-5 h-4 mr-5"
                                    type="checkbox"
                                    id={material}
                                    checked={selectedMaterial === material}
                                    onChange={() => handleMaterialClick(material)}
                                />
                                <label
                                    htmlFor={material}
                                    className={`font-sans cursor-pointer ${
                                        selectedMaterial === material ? "text-white " : ""
                                    }`}
                                >
                                    {material}
                                </label>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MaterialFilter;
