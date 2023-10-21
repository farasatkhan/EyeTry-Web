import React from "react";
import { Link } from "react-router-dom";


export default function PrescriptionDetailsScreen() {
    return (
        <div className="flex flex-col min-h-screen">

            <div className="p-5  bg-gray-50 border mt-10 border-gray-200 rounded-lg shadow w-[90%] mx-auto mb-5">

                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                <Link to='/user/add_prescription'>
                            <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                         focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Add New Prescription</button></Link>
                    
                    {/* prescription cards */}
                    <div>
                    <div className=" bg-white border border-gray-200 rounded-lg shadow mt-10  mx-auto mb-10">
                        <div className="flex flex-row mt-5">
                            <h4 class=" ml-5  text-lg font-bold tracking-tight text-gray-900 font-sans">Prscription Details for ｛｝</h4>
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
                            <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                             focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Delete Prescription</button>
                        <Link to='/user/edit_prescription'>
                            <button type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                         focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Edit Prescription</button></Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

