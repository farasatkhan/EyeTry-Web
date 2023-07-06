import React, {Alert, Text, } from "react";
import Sidebar from "../../../layouts/User/UserProfilingSidebar";
import { FaAddressCard } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { BsFilePostFill } from "react-icons/bs";
import { BsTelephonePlusFill } from "react-icons/bs";
import {  FaUser } from "react-icons/fa";
import {addAddress} from '../../../api/userapi'

export default function AddAddress() {

    return <Sidebar screenComponent={< AddAddressScreen />} />
}

function AddAddressScreen() {

    const [fName,setFName] = React.useState('')
    const [lName,setLName] = React.useState('')
    const [city,setCity] = React.useState('')
    const [postalCode,setPostalCode] = React.useState('')
    const [phone,setPhone] = React.useState('')
    const [currentAddress,setCurrentAddress] = React.useState('')
    const [selectedCountry,setSelectedCountry] = React.useState('')
    const [state, setState] = React.useState('')
    // error messages
    const [errorVisible,setErrorVisible] = React.useState(false)
    const [errorMsg,setErrorMsg] = React.useState('')
    const [successVisible,setSuccessVisible] = React.useState(false)
    const [successMessage,setSuccessMessage] = React.useState(null)


    // form validation 
    const validateForm = () =>{
        if (!selectedCountry || !city || postalCode == '' || phone == '' || !fName || !lName || !state || !currentAddress) {
            setErrorVisible(true)
            setErrorMsg('Please fill out all fields');
            return false;
        }
        return true
    }

    const saveAddress =async () => {
        if(!validateForm()){
            return
        }
        const addressData = {
            firstName: fName,
            lastName: lName,
            phone: phone,
            currentAddress: currentAddress,
            city:city,
            state: state,
            country: selectedCountry,
            zipCode: postalCode
    }

        console.log("Address" ,addressData)
        try {
            const response = await addAddress(addressData)
            console.log("Response inside comp",response)
            if(response.status == 200){
                setSuccessMessage("Address Added Successfully!")
                setSuccessVisible(true)
                setErrorVisible(false)       
                Alert("Information Saved!")    
            }
        }
        catch (e){
            console.error(e)
        }
        // clearing all fields after adding a new address
        setFName('')
        setLName('')
        setCity('')
        setPostalCode('')
        setPhone('')
        setCurrentAddress('')
        setSelectedCountry('')
        setState('')
    }


    return (
        <div className="flex flex-col min-h-screen">
            <div className="p-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[90%] mx-auto mb-5">
                <div className="w-[100%] md:w-[70%] lg:w-[60%] mx-auto mt-10">
                    <div className="mb-10 flex flex-col md:flex-row md:items-center">
                        <div class="md:text-left text-center md:mb-0 mb-4">
                            <h3 className="text-2xl sm:text-4xl  font-bold font-sans">Add Address</h3>
                            <p className=" font-sans text-base ">Edit your profile quickly</p>
                        </div>
                    </div>
                    {errorVisible &&  
                <p style={{color:'red',fontSize:16,alignSelf:'flex-start',paddingBottom:'2%'}}>
                        {errorMsg}
                </p>
                } 
             {successVisible &&  
                <p style={{color:'green',fontSize:16,alignSelf:'flex-start',textAlign:'center',paddingBottom:'2%'}}>
                    {successMessage}
                </p>
                    } 
                    <div className="flex flex-row space-x-4">
                        <div className="flex-grow">
                            <label for="firstname" className="block text-sm font-semibold text-gray-800 font-sans">First Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser color='grey' />
                                </div>
                                <input value={fName} onChange={(e) => setFName(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
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
                                <input value={lName} onChange={(e) => setLName(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Last Name" type="text" />
                            </div>
                        </div>
                    </div>

                    <label for="address1" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaAddressCard color='grey' />
                        </div>
                        <input value={currentAddress} onChange={(e) => setCurrentAddress(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Enter your complete address" type="text" />
                    </div>

                    <label for="lastname" className="block text-sm mt-10 font-semibold text-gray-800 font-sans">State</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaAddressCard color='grey' />
                        </div>
                        <input value={state} onChange={(e) => setState(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                            focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                            sm:text-sm transition duration-150 ease-in-out" placeholder="Enter your complete address" type="text" />
                    </div>

                    <div className="flex flex-row space-x-4">
                        <div className="flex-grow">
                            <label for="firstname" className=" mt-10 block text-sm font-semibold text-gray-800 font-sans">City</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdLocationOn color='grey' />
                                </div>
                                <input value={city} onChange={(e) => setCity(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5  bg-white border rounded-md
                                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter City" type="text" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">Postal Code</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <BsFilePostFill color='grey' />
                                </div>
                                <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your postal code" type="number" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row space-x-4">
                        <div className="flex-grow">
                            <label for="firstname" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">Phone</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <BsTelephonePlusFill color='grey' />
                                </div>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} id='first Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5  bg-white border rounded-md
                                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your phone number" type="phone" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <label for="lastname" className="mt-10 block text-sm font-semibold text-gray-800 font-sans">Country</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MdLocationOn color='grey' />
                                </div>
                                <input value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} id='last Name' className="block w-full pl-10 pr-3 borderblock px-4 py-2.5 mt-2 lg:py-3.5 bg-white border rounded-md
                                focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                sm:text-sm transition duration-150 ease-in-out" placeholder="Enter Your Country" type="tel" />
                            </div>
                        </div>
                    </div>

                    <div className="md:ml-auto md:text-right text-center mt-20">
                        <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
                        <button type="button" onClick={saveAddress} class=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

