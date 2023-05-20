import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import Sidebar from "../../components/ui/UserProfilingSidebar";
import { FaBookOpen } from "react-icons/fa";
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";


export default function PrescriptionDetails() {

    return <Sidebar screenComponent={< PrescriptionDetailsScreen />} />
}

function PrescriptionDetailsScreen() {
    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">


                    <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10  mx-auto mb-10">
                        <div className="flex flex-row mt-5">
                            <h4 class=" ml-5  text-lg font-bold tracking-tight text-gray-900 dark:text-white font-sans">Prscription Details for ｛｝</h4>
                        </div>
                        <hr class="border-3 border-gray-300 my-4" />
                        <div className="p-5">
                            <div>

                                <table className="ml-0 sm:ml-14">
                                    <tr>
                                        <th class="py-2 px-20">Prescription Type</th>
                                        <td>Single Vision</td>
                                    </tr>
                                    <tr>
                                        <th class="py-2 flex items-center px-20"><span class="mr-2">PD-RIGHT</span></th>
                                        <td>35.0</td>
                                    </tr>
                                    <tr>
                                        <th class="py-2 flex items-center px-20"><span class="mr-2">PD-LEFT</span></th>
                                        <td>35.0</td>
                                    </tr>
                                    <tr>
                                        <th class="py-2 px-20">Pupillary Distance</th>
                                        <td>62</td>
                                    </tr>
                                </table>


                                <table className="mt-10 mx-auto">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th className="py-2 px-10">Sphere (SPH)</th>
                                            <th className="py-2 px-10">Cylinder (CYL)</th>
                                            <th className="py-2 px-10">Axis</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="py-2">OD-RIGHT</th>
                                            <td className="px-10">Data 1</td>
                                            <td className="px-10">Data 2</td>
                                            <td className="px-10">Data 3</td>
                                        </tr>
                                        <tr>
                                            <th className="py-2">OD-LEFT</th>
                                            <td className="px-10">Data 4</td>
                                            <td className="px-10">Data 5</td>
                                            <td className="px-10">Data 6</td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>


                        </div>
                    </div>

                    <div className="md:ml-auto md:text-right text-center">
                        <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                         focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                          dark:focus:ring-gray-700 dark:border-gray-700">Edit Prescription</button>
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                         focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700
                          dark:focus:ring-red-900">Delete Prescription</button>
                    </div>
                </div>




            </div>


        </div>



    );
}

