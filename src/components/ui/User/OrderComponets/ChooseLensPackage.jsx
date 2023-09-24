import React from "react";
import silverLens from '../../../../assets/images/orders/silver.png';
import goldLens from '../../../../assets/images/orders/gold.png';
import platinumLens from '../../../../assets/images/orders/platinum.png';
import diamnondLens from '../../../../assets/images/orders/diamond.png';

import { useDispatch } from 'react-redux';
import { updateSelectedOptions } from '../../../../redux/actions/orderSelectionAction';


export default function ChooseLensPackage({ onNextStep }) {
    const dispatch = useDispatch();
  
    const handlePackageAndCoatingsSelect = (packageType, coatingsType) => {
      // Dispatch an action to update selected package and coatings
      dispatch(updateSelectedOptions({
        "lensProperties": {
          "package": packageType,
          "coatings": coatingsType
        }
      }));
  
      // Call the parent's handleNextStep function when the element is clicked
      onNextStep();
    };

    return (
        <div className="">
            <h1 className="font-sans font-semibold text-2xl mx-auto mb-5">Choose Lens Package</h1>
            <div className=" h-[450px] overflow-auto">
                <div onClick={() => {
                    handlePackageAndCoatingsSelect("Silver", "1.5 index ClearViz©️ Lenses, Lens Protective")
         
                }}
                    className="cursor-pointer hover:border-gray-400 flex flex-row fixed-div mb-3 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-200">
                    <div className="w-[25%] flex items-center bg-white rounded-l-lg">
                        <img className="h-200" src={silverLens} alt="free silver package" />
                    </div>
                    <div class="w-[75%] p-4">
                        <h2 class="text-lg font-bold mb-2">Silver (Free)</h2>
                        <p class=" text-sm font-sans">1.5 index ClearViz©️ Lenses</p>
                    </div>
                </div>

                <div onClick={() => {
                        handlePackageAndCoatingsSelect("Gold", "1.5 index ClearViz©️ Lenses, Anti-scratch coating, 100% UV-Block coating, Anti-reflective coating");
                   
                    }}
                    className="cursor-pointer hover:border-gray-400 flex flex-row fixed-div mb-3 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-200">
                    <div className="w-[25%] flex items-center bg-white rounded-l-lg">
                        <img className="h-200" src={goldLens} alt="free silver package" />
                    </div>
                    <div class="w-[75%] p-4">
                        <h2 class="text-lg font-bold mb-2">Gold</h2>
                        <div className="text-xs mb-2">
                            <span className="text-blue-600 font-semibold mr-2 bg-blue-200 rounded-full p-[4px]">Lens Protective</span>
                        </div>
                        <p class=" text-sm font-sans">1.5 index ClearViz©️ Lenses, Anti-scratch coating, 100% UV-Block coating, Anti-reflective coating</p>
                    </div>
                </div>

                <div onClick={() => { 
                        handlePackageAndCoatingsSelect("Platinum", "1.61 index featherweight G-vision©️ Lenses, up to 30% thinner, Anti-scratch coating, 100% UV-block coating, Anti-reflective coating");

                    }}
                    className="cursor-pointer hover:border-gray-400 flex flex-row fixed-div mb-3 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-200">
                    <div className="w-[25%] flex items-center bg-white rounded-l-lg">
                        <img className="h-200" src={platinumLens} alt="free silver package" />
                    </div>
                    <div class="w-[75%] p-4">
                        <h2 class="text-lg font-bold mb-2">Platinum</h2>
                        <div className="text-xs mb-2">
                            <span className="text-blue-600 font-semibold mr-2 bg-blue-200 rounded-full p-[4px]">Lens Protective</span>
                            <span className="text-green-600 font-semibold mr-2 bg-green-200 rounded-full p-[4px]">Super Thin Lenses</span>
                        </div>
                        <p class=" text-sm font-sans">1.61 index featherweight G-vision©️ Lenses, up to 30% thinner, Anti-scratch coating, 100% UV-block coating, Anti-reflective coating</p>
                    </div>
                </div>

                <div onClick={() => { 
                        handlePackageAndCoatingsSelect("Diamond", "1.67 index G-vision©️ ultra-thin lenses, up to 40% thinner, Anti-scratch coating, 100% UV-Block coating (UVA + UVB), Enhanced Anti-reflective coating");
                     
                    }} className="cursor-pointer hover:border-gray-400 flex flex-row fixed-div mb-3 bg-white border-2 border-gray-300 rounded-md hover:bg-gray-200">
                    <div className="w-[25%] flex items-center bg-white rounded-l-lg">
                        <img className="h-200" src={diamnondLens} alt="free silver package" />
                    </div>
                    <div class="w-[75%] p-4">
                        <h2 class="text-lg font-bold mb-2">Diamond</h2>
                        <div className="text-xs mb-2">
                            <span className="text-blue-600 font-semibold mr-2 bg-blue-200 rounded-full p-[4px]">Lens Protective</span>
                            <span className="text-green-600 font-semibold mr-2 bg-green-200 rounded-full p-[4px]">Super Thin Lenses</span>
                            <span className="text-yellow-600 font-semibold bg-yellow-200 rounded-full p-[4px]">Premium coatings</span>
                        </div>
                        <p class=" text-sm font-sans">1.67 index G-vision©️ ultra-thin lenses, up to 40% thinner, Anti-scratch coating, 100% UV-Block coating (UVA + UVB), Enhanced Anti-reflective coating, Free Prescription Card (15% off your next purchase)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

