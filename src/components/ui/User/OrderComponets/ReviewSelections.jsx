import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import superHydrophobic from '/superHydrophobic.svg'
import { useSelector } from "react-redux";

export default function SelectLensTypeComponentProp({ selectedOptions, onConfirmSelection }) {

    // retrieving values from redux 
    const orderSelections = useSelector((state) => state.selectedOptions);

    const lens = orderSelections.selectedOptions.lensProperties;

    // Create a ref for the checkbox
    const checkboxRef = useRef(null);

    // Function to programmatically click the checkbox
    const handleClickOtherElement = () => {
        if (checkboxRef.current) {
            checkboxRef.current.click();
        }
    };

    return (
        <div className="w-full">
            <h1 className="font-sans font-semibold text-2xl mx-auto mb-2">Review Your Selections</h1>
            <p className="mb-10 text-base font-sans">You can select more than one.</p>

            <div className="flex items-center flex-col">
                <div className="w-[90%] bg-white flex-col flex">
                    <div className="flex flex-row">
                        <div className="rounded-l-sm w-[20%] flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="transparent" stroke-width="1.5" viewBox="0 0 44 31" class="summaryInfoRow__icon___3Y-el"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M18.684 21.137c0 4.896-3.96 8.86-8.843 8.86-4.884 0-8.84-3.964-8.84-8.86 0-4.895 3.956-8.86 8.84-8.86s8.843 3.965 8.843 8.86Zm0 0A3.32 3.32 0 0 1 22 17.814a3.322 3.322 0 0 1 3.315 3.323m0 0c0 4.896 3.957 8.86 8.842 8.86 4.884 0 8.843-3.964 8.843-8.86 0-4.895-3.96-8.86-8.843-8.86-4.885 0-8.842 3.965-8.842 8.86ZM1 20.937V4.324A3.32 3.32 0 0 1 4.315 1m38.684 19.937V4.324A3.324 3.324 0 0 0 39.683 1"></path></svg>
                        </div>
                        <div className="rounded-r-sm w-[80%] p-5">
                            <h3 className="text-md font-semibold">Frame</h3>
                            <p className="text-sm font-sans">Prada PR 10YV, Brown / Tortoise, Medium  (<span className="line-through">+$468</span> +$421)</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex flex-row">
                        <div className="rounded-l-sm w-[20%] flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke-width="1.5" viewBox="0 0 32 26" class="summaryInfoRow__icon___3Y-el"><path stroke="currentColor" stroke-linecap="round" d="m11.5 10.97 3.47-3.47m3.06 10 3.47-3.47m-9.18 2.65L20.4 8.6m6.45 12.12c2.9-3.09 3.98-7.58 3.4-11.7-.53-3.58-3.67-5.65-6.84-6.73C17.4.1 5.36.4 2.4 5.7-.68 11.34 5.31 25 16.51 25c4.08-.03 6.6-1.1 9-3.03l-.42.3c.63-.47 1.24-.97 1.76-1.55Z"></path></svg>                    </div>
                        <div className="rounded-r-sm w-[80%] p-5">
                            <h3 className="text-md font-semibold">Lens</h3>
                            <p className="text-sm font-sans">Prada PR 10YV, Brown / Tortoise, Medium (<span className="line-through">+$468</span> +$421)</p>
                            <p className="text-sm font-sans"> <span className="font-semibold">Package:</span> {lens.package}</p>
                            <p className="text-sm font-sans"> <span className="font-semibold">Coatings:</span> {lens.coatings} (+$48)</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex flex-row">
                        <div className="rounded-l-sm w-[20%] flex justify-center items-center">
                            <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 30 30" stroke-width="1.5" class="summaryInfoRow__icon___3Y-el"><circle cx="15" cy="15" r="14" fill="#fff" stroke="#0F0F0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle><path d="m20.732 14.997-5.727-6.364-5.728 6.364" stroke="#0F0F0F" stroke-width="1.5" stroke-linejoin="round"></path><path stroke="#000" stroke-width="1.5" d="M15.117 8.633v12.728"></path></svg>                    </div>
                        <div className="rounded-r-sm w-[80%] h-full p-5">
                            <h3 className="text-md font-semibold">Upgrades</h3>
                            <p className="text-sm font-sans">Prada PR 10YV, Brown / Tortoise, Medium (<span className="line-through">+$468</span> +$421)</p>
                            <p className="text-sm font-sans"> <span className="font-semibold">Upgrades:</span> {lens.upgrades} (+$14)</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-[90%] mt-10 justify-center items-center">
                    <Link to="/user/cart"><button type="button" className="w-[50%] focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                 focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 ">Add To Cart</button></Link>
                    <button type="button" className="w-[50%] text-white bg-gray-800 hover:bg-gray-900 focus:outline-none
                 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 ">Buy Now</button>
                </div>

            </div>
        </div>
    )
}


