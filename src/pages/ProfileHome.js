import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Sidebar from "../components/ui/UserProfilingSidebar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaRegEnvelope, FaUser, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";
import { viewAddresses, deleteAddress, getSpecificAddress } from '../api/userapi';

export default function ProfileHome() {

    return <Sidebar screenComponent={< ProfileHomeScreen />} />
}
function ProfileHomeScreen() {
    const [addresses, setAddresses] = React.useState([])
    const [isDataFetched, setIsDataFetched] = React.useState(false)

    React.useEffect(() => {
        const getAllAddresses = async () => {
            try {
                const response = await viewAddresses()
                setAddresses(response)
                setIsDataFetched(true) 
            }
            catch (e) {
                throw e
            }
        }
        getAllAddresses()
    }
        , [])

    return (
        <div className="flex flex-col min-h-screen">
            <div class=" text-center md:mb-0 mb-4">
                <h3 className="text-2xl mt-10 sm:text-3xl  font-bold font-sans">Manage Profile Information</h3>
                <p className=" font-sans text-base mt-3">Manage Your profile Information here</p>
            </div>
            <div className=" bg-white border mt-10 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className=" left-0 pl-3 flex items-center pointer-events-none ">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>

                    <h4 class=" text-xl font-bold tracking-tight text-gray-900 dark:text-white ">My Orders</h4>
                </div>
                <hr class="border-3 border-gray-300 my-4" />
                <div className="p-5">
                    <p className="text-base">You currently have no orders</p>
                </div>
            </div>

            <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div class="flex items-center justify-between w-full">
                        <h2 class="mr-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white">Personal Information</h2>
                        <Link to='/my_details'><button class="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} class="mr-2" />
                            <span>Edit</span>
                        </button></Link>
                    </div>
                </div>
                <hr class="border-3 border-gray-300 my-4" />
                <div className="p-5">
                    <div className="flex flex-row space-x-4">
                        <div className="flex-grow">
                            <label for="firstname" className="block text-sm font-semibold text-gray-800 font-sans">First Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your First Name" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="block text-sm font-semibold text-gray-800 font-sans">Last Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Last Name" type="text" />
                            </div>
                        </div>
                    </div>


                    <label for="email" className="block text-sm mt-5 font-semibold text-gray-800 font-sans">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRegEnvelope color='grey' />
                        </div>
                        <input id='email' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="info@yourmai.com" type="email" />
                    </div>
                </div>
            </div>


            <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div class="flex items-center justify-between w-full">
                        <h2 class="mr-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white">My Prescriptions</h2>
                        <Link to='/add_prescription'><button class="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} class="mr-2" />
                            <span>Add New Prescription</span>
                        </button></Link>
                    </div>
                </div>
                <hr class="border-3 border-gray-300 my-4" />
                <div className="p-5">

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Prescription Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Prescription 1
                                    </th>
                                    <td class="px-6 py-4">
                                        23 May 2023
                                    </td>
                                    <td class="px-6 py-4">
                                        Single Vision
                                    </td>
                                    <td class=" py-4 text-right">
                                        <button class="py-1 px-4 rounded inline-flex items-center ml-auto
                                            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                             hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                                            <BiEdit size={20} class="mr-2" />
                                            <span>Edit</span>
                                        </button>
                                        <button class="py-1 px-4 rounded inline-flex items-center ml-auto
                                            bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                             hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                                            <MdDelete size={20} class="mr-2" />
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Prescription 2
                                    </th>
                                    <td class="px-6 py-4">
                                        23 May 2023
                                    </td>
                                    <td class="px-6 py-4">
                                        Progressive
                                    </td>
                                    <td class=" py-4 text-right">
                                        <button class="py-1 px-4 rounded inline-flex items-center ml-auto
                                            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                             hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                                            <BiEdit size={20} class="mr-2" />
                                            <span>Edit</span>
                                        </button>
                                        <button class="py-1 px-4 rounded inline-flex items-center ml-auto
                                            bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                             hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                                            <MdDelete size={20} class="mr-2" />
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Prescription 3
                                    </th>
                                    <td class="px-6 py-4">
                                        23 May 2023
                                    </td>
                                    <td class="px-6 py-4">
                                        Bifocal
                                    </td>
                                    <td class=" py-4 text-right">
                                        <button class="py-1 px-4 rounded inline-flex items-center ml-auto
                                            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                             hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                                            <BiEdit size={20} class="mr-2" />
                                            <span>Edit</span>
                                        </button>
                                        <button class="py-1 px-4 rounded inline-flex items-center ml-auto
                                            bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                             hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                                            <MdDelete size={20} class="mr-2" />
                                            <span>Delete</span>
                                        </button>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>


            <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div class="flex items-center justify-between w-full">
                        <h2 class="mr-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white">Address Book</h2>
                        <Link to='/add_address'><button class="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} class="mr-2" />
                            <span>Add New Address</span>
                        </button></Link>
                    </div>
                </div>
                <hr class="border-3 border-gray-300 my-4" />
                <div className="p-5">

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                            <tbody>
                                {
                                    addresses.map((address) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 text-base font-sans">
                                                <h5 className="font-bold text-black mb-2">{address.firstName}</h5>
                                                <p className="font-semibold text-base font-sans">This is your default delivery address</p>
                                                <p className="text-base font-sans">
                                                    {address.currentAddress}, {address.city}, {address.zipCode}, {address.country},
                                                    {address.phone}
                                                </p>
                                            </td>
                                            <td className="py-4 text-right">
                                                <button to='/edit_address/:id' className="py-1 px-4 rounded inline-flex items-center ml-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                                                    <BiEdit size={20} className="mr-2" />
                                                    <span>Edit</span>
                                                </button>
                                                <button  className="py-1 px-4 rounded inline-flex items-center ml-auto bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                                                    <MdDelete size={20} className="mr-2" />
                                                    <span>Delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div class="flex items-center justify-between w-full">
                        <h2 class="mr-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white">Payment Methods</h2>
                        <Link to='/add_payment'><button class="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} class="mr-2" />
                            <span>Add New Payment Method</span>
                        </button></Link>
                    </div>
                </div>
                <hr class="border-3 border-gray-300 my-4" />
                <div className="p-5">

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <td class="px-6 py-4 text-base">
                                        <h5 className=" font-bold text-black">Abdul Sammi Gul</h5>
                                        <p className="text-base font-sans">VISA
                                            4599350720135209
                                            12/2026
                                            652
                                        </p>
                                    </td>
                                    <td class=" py-4 text-right">
                                        <button class="py-1 px-4 rounded inline-flex items-center ml-auto
                                            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                             hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                                            <BiEdit size={20} class="mr-2" />
                                            <span>Edit</span>
                                        </button>
                                        <button class="py-1 px-4 rounded inline-flex items-center ml-auto
                                            bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                             hover:text-white border border-red-500 hover:border-transparent justify-end mr-5">
                                            <MdDelete size={20} class="mr-2" />
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div class="flex items-center justify-between w-full">
                        <h2 class="mr-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white">Try On Images</h2>
                        <Link to='/upload_tryon_images'><button class="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} class="mr-2" />
                            <span>Upload Image</span>
                        </button></Link>
                    </div>
                </div>
                <hr className="border-3 border-gray-300 my-4" />
                <div className="p-5">

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img src={require('../assets/images/tryon.png')} alt="logo" className='w-full h-full' />
                        <div className="p-5 flex justify-center space-x-5">
                            <button class="py-1 px-4 rounded inline-flex items-center 
                                            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                             hover:text-white border border-blue-500 hover:border-transparent ">
                                <BiEdit size={20} class="mr-2" />
                                <span>Edit</span>
                            </button>
                            <button class="py-1 px-4 rounded inline-flex items-center 
                                            bg-transparent hover:bg-red-500 text-red-700 font-semibold 
                                             hover:text-white border border-red-500 hover:border-transparent ">
                                <MdDelete size={20} class="mr-2" />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>



                </div>
            </div>

            <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[80%]  md:w-[65%] mx-auto mb-10">
                <div className="flex flex-row mt-5">
                    <div className="left-0 pl-3 flex items-center pointer-events-none">
                        <BiEdit size={30} className="mr-5 pb-1" />
                    </div>
                    <div class="flex items-center justify-between w-full">
                        <h2 class="mr-auto text-xl font-bold tracking-tight text-gray-900 dark:text-white">Giftcard / Store Credit</h2>
                        <Link to='/giftcards'><button class="py-1 px-4 rounded inline-flex items-center ml-auto
                 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                 hover:text-white border border-blue-500 hover:border-transparent justify-end mr-5">
                            <BiEdit size={20} class="mr-2" />
                            <span>Buy Gift Cards</span>
                        </button></Link>
                    </div>
                </div>
                <hr class="border-3 border-gray-300 my-4" />
                <div className="p-5">

                    <p className="text-base font-sans mb-5">To check your Gift Card/Store Credit balance, enter your card number or store credit</p>

                    <span className="flex flex-row">
                        <input id='email' className="block w-full sm:w-[80%] lg:w-[50%] pl-10 pr-3 borderblock px-4 py-2.5 mt-2  bg-white border rounded-md
                                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                sm:text-sm transition duration-150 ease-in-out" placeholder="Gift Card/Store Credit number" type="number" />
                        <button class="ml-5 px-4 rounded inline-flex items-center 
                                            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold 
                                             hover:text-white border border-blue-500 hover:border-transparent ">
                            <span>Check Balance</span>
                        </button>
                    </span>


                </div>
            </div>

            {/* <div className="flex-grow"></div> */}

        </div>


    );
}

