import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../layouts/User/UserProfilingSidebar";


export default function Wishlist() {

    return <Sidebar screenComponent={< WishlistScreen />} />
}

function WishlistScreen() {
    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                    <div className=" text-center md:mb-0 mb-4">
                        <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Your Wishlist</h3>
                        <p className=" font-sans text-base mt-3">There are 2 products in this list</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-20 mb-24">

                        <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img src={require('../../../assets/images/UserProfiling/glasses1.png')} alt="logo" className='w-full' />

                            </a>
                            <div className="p-5">

                                <div className="flex flex-row ">
                                    <Link to="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Willetta</h5>
                                    </Link>
                                    <p className="font-sans text-3xl font-bold ml-auto">$199.95</p>
                                </div>

                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Black Oak Tortoise</p>
                                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Details
                                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </a>
                            </div>
                        </div>
                        <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img src={require('../../../assets/images/UserProfiling/glasses2.png')} alt="logo" className='w-full' />

                            </a>
                            <div className="p-5">
                                <div className="flex flex-row ">
                                    <Link to="#">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Willetta</h5>
                                    </Link>
                                    <p className="font-sans text-3xl font-bold ml-auto">$199.95</p>
                                </div>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Black Oak Tortoise</p>
                                <Link to="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Details
                                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <button type="button" className="w-40 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-10 dark:bg-gray-800 dark:hover:bg-gray-700
                        dark:focus:ring-gray-700 dark:border-gray-700">Save</button>
                    </div>

                </div>

            </div>

        </div>
    );
}



